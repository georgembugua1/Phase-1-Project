const API_KEY = "49554769-be4680af12797a1843a416211"
document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const searchinput = document.getElementById("searchInput");
    const uploadButton = document.getElementById("uploadButton");
    const imageUpload = document.getElementById("imageUpload");
    const imageTitle = document.getElementById("imageTitle");
    let images = JSON.parse(localStorage.getItem("images")) || [];
//Funtion to display images//
function displayImages(imageList) {
    gallery.innerHTML = "";
    imageList.forEach((image, index) => {
        const imgContainer = document.createElement("div");
        imgConatainer.classList.add("image-container");
        const imgElement = document.createElement("img");
        imgElement.src = image.url;
        imageElement.alt = image.imagetitle
        imgElement.classList.add("gallery-item");
        const caption = document.createElement("p");;
        caption.textContent = `${image.title} - Tags: ${image.tags}`;
        imgElement.addEventListener("click", () => openModal(Image));
        imgConatainer.appendChild(imgElement);
        imgContainer.appendChild(caption);
        gallery.appendChild(imgContainer);
    });
}
//Function to open Modal//
function openModal(Image) {
    const modal = document.getElementById("modal");
    const modalimage = document.getElementById("modalImage")
    const modalTitle = document.getElementById("modalTitle")
    const modalTags = document.getElementById("modalTags");
    modal.style.display = "block";
    modalImage.src = image.largeImageURL;
    modalTitle.textContent = `Tags: ${images.tags}`;
    modalTags.textContent = `Photographer: ${image.user}`;
    modalTags.textContent = `Photographer: ${image.user}`;
    document.querySelector(".close").addEventListener("click", () => {
        modal.style.display = "none";
    })
}
//Function to filter images by tags//
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    fetchImages(query);
});
    
//funcion to handle image upload//
uploadButton.addEventListener("click", () => {
    const file = imageUpload.files[0];
    if (file && imageTitle.value.trim() && imageTags.value.trim()) {
        const reader = newFileReader();
        reader.onload = (event) => {
        const newImage = {
            event.target.result, title:
            imageTitle.value.trim(), tags:
            imageTags.value.trim()
};
images.push(newImage);
localStorage.setItem("images", JSON.stringify(images));
displayImages(images);
imagesUpload.value = "";
imageTitle.value = "";
imageTags.value = "";
        };
        reader.readAsDataURL(file);
    }else {
        alert("PLease select an image and enter title and tags");
    }
    }
});
//Load images on Page//