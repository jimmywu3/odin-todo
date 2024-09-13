import editIcon from "./assets/edit.svg"
import finishIcon from "./assets/finish.svg"
import viewIcon from "./assets/view.svg"
import { Project } from "./project-task";
import { Projects } from "./data";
import { resetPage } from "./domHelper";

const test = (function(){
    return "test";
});

const sidebarHelper = function(name){
    const project = document.createElement("li");
    const projectBtn = document.createElement("button");
    projectBtn.textContent = name;
    project.appendChild(projectBtn);
    return project;
}

const contentProjectHelper = function(name, tasks, index){
    // creates div with class of project and p#
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project");
    projectContainer.classList.add(`p${index}`);

    //creates clickable title for project
    const titleBtn = contentTitleHelper(name)
    projectContainer.appendChild(titleBtn);

    //need to call content taskhelper here later
    const taskContainer = contentTaskHelper(tasks)
    projectContainer.appendChild(taskContainer);
    

    return projectContainer
}

//creates clickable title for project
const contentTitleHelper = function(name){
    const title = document.createElement("h1");
    title.className = "title";
    title.textContent = name;

    //view all button
    const viewAllBtn = document.createElement("button");
    viewAllBtn.className = "view-all-button";

    const viewAllIcon = document.createElement("img");
    viewAllIcon.src = viewIcon;
    viewAllBtn.appendChild(viewAllIcon);


    const viewAllText = document.createElement("p");
    viewAllText.textContent = "View All";
    viewAllBtn.appendChild(viewAllText);

    title.appendChild(viewAllBtn);
    return title;
}

// this could be repurposed for creating tasks n stuff in the individual project focused pages
const contentTaskHelper = function(tasks){
    const tasksContainer = document.createElement("div");
    tasksContainer.className = "tasks"

    for(let i = 0; i < Math.min(tasks.length, 4); i++){
        const taskContainer = document.createElement("div");
        taskContainer.className = `task ${i}`;

        const name = document.createElement("h2");
        name.textContent = tasks[i].name;
        taskContainer.appendChild(name);

        const dueDate = document.createElement("p");
        dueDate.textContent = "Due Date";
        taskContainer.appendChild(dueDate)

        const actions = document.createElement("div");
        actions.className = "actions";

        const editBtn = document.createElement("button");
        // create an image to store inside button
        editBtn.id = "edit";
        const editImg = document.createElement("img");
        editImg.src = editIcon;
        editBtn.appendChild(editImg);
        actions.appendChild(editBtn);

        const finishBtn = document.createElement("button");
        // create an image to store inside button
        finishBtn.id = "finish"
        const finishImg = document.createElement("img");
        finishImg.src = finishIcon;
        finishBtn.appendChild(finishImg);
        actions.appendChild(finishBtn);

        taskContainer.appendChild(actions);


        tasksContainer.appendChild(taskContainer);
    }

    //Create an addmore / view all button


    return tasksContainer;
}

const createNewProjectInitializer = function(){
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
            console.log(Projects)
        } else{
            projectName.reportValidity();
        }
    });

}

const updatePage = () => {
    resetPage();
    createDom(Projects, Projects.length);
}

// will be moved into a dom helper js

const createDom = (function(array, length){
    const sidebar = document.querySelector(".sidebar .projects ul");
    const content = document.querySelector(".content");
    for(let i = 0; i < length; i++){
        sidebar.appendChild(sidebarHelper(array[i].name));
        content.appendChild(contentProjectHelper(array[i].name, array[i].getTasks(), i));
    }
    createNewProjectInitializer();
});

export {test, createDom}; 