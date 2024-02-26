try {
     function appendBlogs() {
          // Declare projectArea outside of any function so that it has a broader scope
          let projectArea = "";

          // Function to handle adding projects
          function addProjects() {
               // Initializing variables  
               const commonProjectsAreaContainer = document.querySelector(".common-projects-container");
               const addProjectBtn = Array.from(document.querySelectorAll(".add-projects-btn"));
               const addProjectArea = document.querySelector(".add-project-area-container");
               const commonProjectsArea = document.querySelector('.common-projects');
               const crossIcon = document.querySelector(".cross-icon");

               loadData("Main-common-project-area-container");

               let addProjectTitle = document.querySelector(".add-project-area .title-input input");
               const addProjectDescription = document.querySelector(".add-project-area .description-input textarea");
               let addProjectImage = document.querySelector(".add-project-area .image-input input");
               let addProjectUrl = document.querySelector(".add-project-area .url-input input");
               let addProjectPreviewUrl = document.querySelector(".add-project-area .preview-url-input input");

               let mainProjectAddBtn = document.querySelector(".main-project-add-btn");

               // Setting eventListener on each add button
               addProjectBtn.forEach((element) => {
                    element.addEventListener("click", () => {
                         // Get the project area for the current button
                         projectArea = element.parentNode.querySelector('.common-projects').querySelector(".user-items");
                         addProjectArea.classList.add("show-add-project-area");
                    });
               });

               // Event listener for closing the project area
               crossIcon.addEventListener("click", () => {
                    addProjectArea.classList.remove("show-add-project-area");
               });

               // Main function to add project items
               function addProjectItems() {
                    // Get values from input fields
                    let projectTitleValue = addProjectTitle.value.trim();
                    let projectDescriptionValue = addProjectDescription.value.trim();
                    let projectUrlValue = addProjectUrl.value.trim();
                    let projectPreviewUrlValue = addProjectPreviewUrl.value.trim();
                    let projectImageFile = addProjectImage.files[0];

                    if (projectTitleValue !== "" && projectDescriptionValue !== "" && projectImageFile !== "") {
                         if (projectImageFile) {
                              const reader = new FileReader();

                              reader.onload = function (e) {
                                   const projectImageValue = e.target.result;

                                   // Append project HTML to the project area
                                   const newCommonProjectsArea = document.createElement('div');
                                   newCommonProjectsArea.className = "common-project-items";

                                   newCommonProjectsArea.innerHTML = `
                        <div class="project-img"><img src="${projectImageValue}" alt="..."></div>
                        <div class="project-text">
                            <h3 class="project-name">${projectTitleValue}</h3>
                            <p>${projectDescriptionValue}</p>
                            <div class="project-buttons">
                                <button class="preview common-btn common-small-btn"><a href="${projectPreviewUrlValue}" target="_blank">Preview</a></button>
                                <button class="source-code common-btn common-small-btn"><a href="${projectUrlValue}" target="_blank">Source code</a></button>
                            </div>
                        </div>`;

                                   projectArea.appendChild(newCommonProjectsArea)
                                   saveData("Main-common-project-area-container");
                              };

                              // Read the image file as a data URL
                              reader.readAsDataURL(projectImageFile);
                         }
                    } else {
                         alert("Please fill your project information to add.")
                         return;
                    }

                    addProjectArea.classList.remove("show-add-project-area");

                    addProjectTitle.value = "";
                    addProjectDescription.value = "";
                    addProjectUrl.value = "";
                    addProjectPreviewUrl.value = ""
                    addProjectImage.files[0] = "";
               }

               // Event listener for the main "Add" button
               mainProjectAddBtn.addEventListener("click", () => {
                    addProjectItems();
               });

          }

          // Call the addProjects function to initialize
          addProjects();

          // Saving data in localStorage
          function saveData(key) {
               const mainCommonProjectArea = document.querySelector(".common-projects-container");
               localStorage.setItem(key, mainCommonProjectArea.innerHTML);
          }

          function loadData(key) {
               const mainCommonProjectArea = document.querySelector(".common-projects-container");
               const setedItem = localStorage.getItem(key);
               if (setedItem) {
                    mainCommonProjectArea.innerHTML = setedItem;
               }
          }
     }
     appendBlogs()
} catch (err) {
     console.log(err)
}


finally {
     // showHeader function  
     function showHeader() {
          const menuItems = document.querySelector('.menus');
          const crossIcon = document.querySelector(".cross-icon");
          const hamburgerIcon = document.querySelector(".hamburger-icon");
          // hamburgerIcon eventListener
          hamburgerIcon.addEventListener("click", () => {
               menuItems.classList.add('show-header');
          })
          // crossIcon eventListener 
          crossIcon.addEventListener('click', () => {
               menuItems.classList.remove('show-header')
          })
     }
     showHeader()
}

