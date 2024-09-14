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
    addTaskBtn.addEventListener("click", () => {
        const newTask = Task("Temp", "dawg");
        Projects[index].addTask(newTask)
        updateContent(Projects[index], index)
        //working
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