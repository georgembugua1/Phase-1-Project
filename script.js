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
        const imgContainer = document
    })
}

