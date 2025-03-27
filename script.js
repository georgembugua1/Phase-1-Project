const API_KEY = "49554769-be4680af12797a1843a416211";

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const searchInput = document.getElementById("searchInput");
    const uploadButton = document.getElementById("uploadButton");
    const imageUpload = document.getElementById("imageUpload");
    const imageTitle = document.getElementById("imageTitle");
    const imageTags = document.getElementById("imageTags"); 
    let images = JSON.parse(localStorage.getItem("images")) || [];

    // Function to display images
    function displayImages(imageList) {
        gallery.innerHTML = "";
        imageList.forEach((image, index) => {
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("image-container");

            const imgElement = document.createElement("img");
            imgElement.src = image.url; 
            imgElement.alt = image.title; 
            imgElement.classList.add("gallery-item");

            const caption = document.createElement("p");
            caption.textContent = `${image.title} - Tags: ${image.tags}`;
            imgElement.addEventListener("click", () => openModal(image)); 
            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(caption); 
            gallery.appendChild(imgContainer);
        });
    }

    // Function to open Modal
    function openModal(image) {  
        const modal = document.getElementById("modal");
        const modalImage = document.getElementById("modalImage");
        const modalTitle = document.getElementById("modalTitle");
        const modalTags = document.getElementById("modalTags");

        modal.style.display = "block";
        modalImage.src = image.url; 
        modalTitle.textContent = `Title: ${image.title}`; 
        modalTags.textContent = `Tags: ${image.tags}`;  
        document.querySelector(".close").addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Function to filter images by tags
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        fetchImages(query);
    });

    // Function to handle image upload
    uploadButton.addEventListener("click", () => {
        const file = imageUpload.files[0];
        if (file && imageTitle.value.trim() && imageTags.value.trim()) {
            const reader = new FileReader(); 
            reader.onload = (event) => {
                const newImage = {
                    url: event.target.result,
                    title: imageTitle.value.trim(),
                    tags: imageTags.value.trim()
                };
                images.push(newImage);
                localStorage.setItem("images", JSON.stringify(images));
                displayImages(images);
                imageUpload.value = "";  
                imageTitle.value = "";   
                imageTags.value = "";    
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please select an image and enter title and tags.");
        }
    });

    // Function to fetch images//
    function fetchImages(query = "") {
        const filteredImages = images.filter(image => {
            return image.title.toLowerCase().includes(query) || image.tags.toLowerCase().includes(query);
        });
        displayImages(filteredImages);
    }

    // Load images on page//
    displayImages(images);  
});
