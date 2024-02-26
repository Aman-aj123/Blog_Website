function showBlogs() {
    const createBtn = document.querySelector('.main-create-btn');
    const crossIcon = document.querySelector('.cross-icon');
    const blogAddBtn = document.querySelector(".add-blog-btn");
    const createBlogArea = document.querySelector('.create-blog-area');
    const addBlogsArea = document.querySelector(".add-blogs");
    loadData("Add-blogs-area");

    createBtn.addEventListener("click", () => {
        createBlogArea.classList.add("show-create-project-area");
    });

    crossIcon.addEventListener("click", () => {
        createBlogArea.classList.remove("show-create-project-area");
    });

    function mainAddBlogs() {

        const blogTitle = document.querySelector('.create-blog-area .title-input input');
        const blogDescription = document.querySelector('.create-blog-area .description-input textarea');
        const blogUrl = document.querySelector(".create-blog-area .url-input input");
        const blogPreviewUrl = document.querySelector(".create-blog-area .preview-url-input input");
        const blogImage = document.querySelector('.create-blog-area .image-input input[type="file"]');

        if (blogTitle.value.trim() !== "" && blogDescription.value.trim() !== "") {
            // Check if a file is selected
            if (blogImage.files.length > 0) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageUrl = e.target.result;

                    const newBlogItem = document.createElement('div');
                    newBlogItem.className = "blog-items flex flex-between align-items";
                    newBlogItem.innerHTML = `
                         <div class="blog-image"><img src="${imageUrl}" alt="Blog Image"></div>
                         <div class="blog-text">
                             <h2 class="blog-name">${blogTitle.value.trim()}</h2>
                             <p>${blogDescription.value.trim()}</p>
                             <div class="project-buttons">
                                 <button class="preview common-btn common-small-btn"><a href="${blogPreviewUrl.value.trim()}" target="_blank">Preview</a></button>
                                 <button class="source-code common-btn common-small-btn"><a href="${blogUrl.value.trim()}" target="_blank">Source code</a></button>
                             </div>
                         </div>
                     `;

                    addBlogsArea.appendChild(newBlogItem);
                    saveData("Add-blogs-area");
                };

                reader.readAsDataURL(blogImage.files[0]);
            } else {
                // Handle case where no file is selected
                alert('Please select an image.');
            }
        } else {
            alert("Please fill your Blog information to add.")
            return;
        }

        // // Clear input values
        // blogTitle.value = "";
        // blogDescription.value = "";
        // blogUrl.value = "";
        // blogPreviewUrl.value = "";
        // blogImage.value = "";
        createBlogArea.classList.remove("show-create-project-area");
    }

    blogAddBtn.addEventListener("click", () => {
        mainAddBlogs();
    });
}

window.addEventListener("DOMContentLoaded", () => {
    showBlogs();
});

// Saving data in localStorage
function saveData(key) {
    const addBlogsArea = document.querySelector(".add-blogs");
    localStorage.setItem(key, addBlogsArea.innerHTML);
}

function loadData(key) {
    const addBlogsArea = document.querySelector(".add-blogs");
    const setedItem = localStorage.getItem(key);
    if (setedItem) {
        addBlogsArea.innerHTML = setedItem;
    }
}
