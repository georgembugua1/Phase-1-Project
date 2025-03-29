document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const searchInput = document.getElementById("search");
    const fileInput = document.getElementById("fileInput");
    const imageTitle = document.getElementById("imageTitle");
    const imageTags = document.getElementById("imageTags");
    const uploadBtn = document.getElementById("uploadBtn");

    const API_KEY = "49554769-be4680af12797a1843a416211";  
    const API_URL = "https://pixabay.com/api/?key=" + API_KEY;

    // Fetch images from Pixabay API
    async function fetchImages(query = "") {
        let url = API_URL;
        if (query) {
            url += `&q=${encodeURIComponent(query)}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.hits) {
                displayImages(data.hits);
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    // Display images in the gallery
    function displayImages(images) {
        gallery.innerHTML = "";
        images.forEach((image) => {
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("image-card");
            imgContainer.setAttribute("data-tags", image.tags.toLowerCase());

            imgContainer.innerHTML = `
                <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image">
                <p class="tags">Tags: ${image.tags || "No tags"}</p>
            `;

            // Click event to open modal
            imgContainer.addEventListener("click", () => openModal(image.largeImageURL, image.tags));

            gallery.appendChild(imgContainer);
        });
    }

    // Open modal function
    function openModal(imageUrl, tags) {
        const modal = document.getElementById("modal");
        const modalImg = document.getElementById("modalImg");
        const caption = document.getElementById("caption");

        modal.style.display = "block";
        modalImg.src = imageUrl;
        caption.innerText = `Tags: ${tags}`;

        // Close modal on click
        document.querySelector(".close").onclick = () => {
            modal.style.display = "none";
        };
    }

    // Search functionality 
    function filterImages() {
        const searchValue = searchInput.value.toLowerCase();
        const images = document.querySelectorAll(".image-card");

        images.forEach((imageCard) => {
            const tagsText = imageCard.getAttribute("data-tags");
            if (tagsText && tagsText.includes(searchValue)) {
                imageCard.style.display = "block";
            } else {
                imageCard.style.display = "none";
            }
        });

        // Fetch from Pixabay if no local images match
        if (gallery.children.length === 0) {
            fetchImages(searchValue);
        }
    }

    searchInput.addEventListener("input", filterImages);

    // Handle Image Upload
    uploadBtn.addEventListener("click", () => {
        const file = fileInput.files[0];
        const title = imageTitle.value.trim();
        const tags = imageTags.value.trim().toLowerCase();

        if (file && title) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgContainer = document.createElement("div");
                imgContainer.classList.add("image-card");
                imgContainer.setAttribute("data-tags", tags); // Store tags for filtering

                imgContainer.innerHTML = `
                    <img src="${e.target.result}" alt="${title}" class="gallery-image">
                    <p class="tags">Tags: ${tags || "No tags"}</p>
                `;

                imgContainer.addEventListener("click", () => openModal(e.target.result, tags));

                gallery.appendChild(imgContainer);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select an image and enter a title.");
        }
    });

    // Load images on page load
    fetchImages();
});
