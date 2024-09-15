import {resetPage, resetTasks, contentProjectHelper, contentTaskHelper} from "./domHelper.js"
import { Task } from "./project-task.js"
import {Projects} from "./data.js"

// sidebar project button
const sidebarProjectBtnInitializer = (index) => {
    const sidebarBtn = document.querySelector(`.p${index}`);
    sidebarBtn.addEventListener("click", () => {
        updateContent(Projects[index], index);
    })    
};

// view all button
const viewAllBtnInitializer = (index) => {
    const viewAllBtn = document.querySelector(`.view${index}`);
    viewAllBtn.addEventListener("click", () => {
        updateContent(Projects[index], index);
    })  
};

const createTaskInitializer = (function() {
    const form = document.querySelector(".task-dialog form");
    const submitBtn = document.querySelector(".editCreate .create");
    const taskName = document.querySelector(".task-dialog form #taskName");
    const taskDescription = document.querySelector(".task-dialog form #description");
    const taskDate = document.querySelector(".task-dialog form #dueDate");
    const dialog = document.querySelector(".task-dialog");



    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const indexGetter = document.querySelector(".project");
        const index = indexGetter.classList[1];
        if(taskName.checkValidity() && taskDescription.checkValidity() && taskDate.checkValidity() ){
            const task = Task(taskName.value, taskDescription.value, taskDate.value);
            Projects[index].addTask(task);
            updateTasks(Projects[index].getTasks())
            dialog.close();
            form.reset();
        } else{
            taskName.reportValidity();
            taskDescription.reportValidity();
            taskDate.reportValidity();
        }
    });

})();

const closeModalInitializer = (function(){
    const form = document.querySelector(".task-dialog form");
    const closeModal = document.querySelector(".task-dialog .close");
    const dialog = document.querySelector(".task-dialog");
    const submitBtn = document.querySelector(".editCreate .create");
    closeModal.addEventListener("click", () => {
        dialog.close();
        form.reset();
        submitBtn.style.display = "none"
    })
})();

const addTaskInitializer = (index) => {
    const addTaskBtn = document.querySelector(`.create${index}`);
    const dialog = document.querySelector(".task-dialog");
    const submitBtn = document.querySelector(".editCreate .create");

    addTaskBtn.addEventListener("click", () => {
        console.log("hihi")
        submitBtn.style.display = "inline-block"
        dialog.showModal();
    });
    // current issue all of these eventlistners are getting created multiple times
    // figure out how to get removeEventlister to work
    // basically any time updateContent is called all the eventlisteners must be 
    //removed


} 

// we might actually need this one 
// by updating only the tasks, add task buttn wont need to be called again
const updateTasks = (tasks) => {
    resetTasks();
    const project = document.querySelector(".project");
    project.appendChild(contentTaskHelper(tasks, true));
}

//create an updateContent function that only updates the content div
const updateContent = (projectRef, index) => {
    const content = document.querySelector(".content");
    resetPage(true);
    content.append(contentProjectHelper(projectRef, index, true));
    addTaskInitializer(index);
}

export {sidebarProjectBtnInitializer, viewAllBtnInitializer}