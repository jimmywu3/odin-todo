import { Project } from "./project-task";
import { Projects } from "./data";
import {resetPage, contentProjectHelper} from "./domHelper";
import {sidebarProjectBtnInitializer, viewAllBtnInitializer} from "./projectPage.js"

const test = (function(){
    return "test";
});

const sidebarHelper = function(projectRef, index){
    const project = document.createElement("li");
    const projectBtn = document.createElement("button");
    projectBtn.className = `p${index}`
    projectBtn.textContent = projectRef.name;
    project.appendChild(projectBtn);
    return project;
}

const createNewProjectInitializer = (function(){
    const dialog = document.querySelector(".newProject");
    const newBtn = document.querySelector(".new-project");
    const closeModal = document.querySelector(".newProject .close");
    newBtn.addEventListener("click", () => {
        dialog.showModal();
    });

    closeModal.addEventListener("click", () => {
        dialog.close();
    });

    const form = document.querySelector(".newProject form");
    const submitBtn = document.querySelector(".newProject form button");
    const projectName = document.querySelector(".newProject form #projectName");
    
    submitBtn.addEventListener("click", (event) =>{
        if(projectName.checkValidity()){
            event.preventDefault();
            console.log(projectName.value);
            const project = Project(projectName.value);
            Projects.push(project);
            updatePage();
            dialog.close();
            form.reset();
        } else{
            projectName.reportValidity();
        }
    });
})();

const logoBtn = (function(){
    const logo = document.querySelector(".logo button");
    logo.addEventListener("click", () => {
        updatePage();
    });
})();

const updatePage = () => {
    resetPage(false);
    createDom(Projects, Projects.length);
}

// will be moved into a dom helper js

const createDom = (function(array, length){
    const sidebar = document.querySelector(".sidebar .projects ul");
    const content = document.querySelector(".content");
    for(let i = 0; i < length; i++){
        sidebar.appendChild(sidebarHelper(array[i], i));
        sidebarProjectBtnInitializer(i);
        content.appendChild(contentProjectHelper(array[i], i, false));
        viewAllBtnInitializer(i);
    }
});

export {test, createDom}; 