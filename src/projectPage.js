import {resetPage, contentProjectHelper} from "./domHelper.js"
import { Task } from "./project-task.js"
import {Projects} from "./data.js"

// sidebar project button
const sidebarProjectBtnInitializer = (index) => {
    const sidebarBtn = document.querySelector(`#p${index}`);
    sidebarBtn.addEventListener("click", () => {
        console.log(`hi ${index}`)
        updateContent(Projects[index], index);
    })    
};

// view all button
const viewAllBtnInitializer = (index) => {
    const viewAllBtn = document.querySelector(`.view${index}`);
    viewAllBtn.addEventListener("click", () => {
        console.log(`hi ${index}`)
        updateContent(Projects[index], index);
    })  
};

const addTaskBtnInitializer = (index) => {
    const addTaskBtn = document.querySelector(`.create${index}`);
    const dialog = document.querySelector(".task-dialog");
    const closeModal = document.querySelector(".task-dialog .close");

    addTaskBtn.addEventListener("click", () => {
        const submitBtn = document.querySelector(".editCreate .create");
        submitBtn.style.display = "inline-block"
        dialog.showModal();
    });

    closeModal.addEventListener("click", () => {
        dialog.close();
    })

    const form = document.querySelector(".task-dialog form");
    const submitBtn = document.querySelector(".editCreate .create");
    const taskName = document.querySelector(".task-dialog form #taskName");
    const taskDescription = document.querySelector(".task-dialog form #description");
    const taskDate = document.querySelector(".task-dialog form #dueDate");

    submitBtn.addEventListener("click", (event) =>{
        if(taskName.checkValidity() && taskDescription.checkValidity() && taskDate.checkValidity() ){
            event.preventDefault();
            const task = Task(taskName.value, taskDescription.value);
            Projects[index].addTask(task);
            updateContent(Projects[index], index);
            dialog.close();
            form.reset();
        } else{
            taskName.reportValidity();
            taskDescription.reportValidity();
            taskDate.reportValidity();
        }
    });



} 

const updateTasks = () => {

}

//create an updateContent function that only updates the content div
const updateContent = (projectRef, index) => {
    const content = document.querySelector(".content");
    resetPage(true);
    content.append(contentProjectHelper(projectRef, index, true));
    addTaskBtnInitializer(index);
}

export {sidebarProjectBtnInitializer, viewAllBtnInitializer}