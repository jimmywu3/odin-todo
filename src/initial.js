import editIcon from "./assets/edit.svg"
import finishIcon from "./assets/finish.svg"
import { Project } from "./project-task";

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
    const titleBtn = document.createElement("button");
    titleBtn.className = "title"
    const title = document.createElement("h1");
    title.textContent = name;
    titleBtn.appendChild(title);
    return titleBtn;
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
            console.log(project);
            /* add element to projects array*/
            dialog.close();
            form.reset();
        } else{
            projectName.reportValidity();
        }
    });

}

const initialDom = (function(array, length){
    const sidebar = document.querySelector(".sidebar .projects ul");
    const content = document.querySelector(".content");
    for(let i = 0; i < length; i++){
        sidebar.appendChild(sidebarHelper(array[i].name));
        content.appendChild(contentProjectHelper(array[i].name, array[i].getTasks(), i));
    }
    createNewProjectInitializer();
});

export {test, initialDom}; 