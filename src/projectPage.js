import {resetPage, resetTasks, contentProjectHelper, contentTaskHelper} from "./domHelper.js"
import { Project, Task } from "./project-task.js"
import {Projects} from "./data.js"

// sidebar project button
const sidebarProjectBtnInitializer = (index) => {
    const sidebarBtn = document.querySelector(`.p${index}`);
    sidebarBtn.addEventListener("click", () => {
        const parsedProjects = JSON.parse(localStorage.getItem("projects"));
        updateContent(parsedProjects[index], index);
    })    
};

// view all button
const viewAllBtnInitializer = (index) => {
    const viewAllBtn = document.querySelector(`.view${index}`);
    viewAllBtn.addEventListener("click", () => {
        const parsedProjects = JSON.parse(localStorage.getItem("projects"));
        updateContent(parsedProjects[index], index);
    })  
};

const placeholderInitializer = (index) => {
    const placeholder = document.querySelector(`.p-${index} .tasks .placeholder`);
    placeholder.addEventListener("click", () => {
        const parsedProjects = JSON.parse(localStorage.getItem("projects"));
        updateContent(parsedProjects[index], index);
    });
}

const createTaskInitializer = (function() {
    const form = document.querySelector(".task-dialog form");
    const taskName = document.querySelector(".task-dialog form #taskName");
    const taskDescription = document.querySelector(".task-dialog form #description");
    const taskDate = document.querySelector(".task-dialog form #dueDate");
    const dialog = document.querySelector(".task-dialog");
    const createBtn = document.querySelector(".editCreate .create");


    createBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const indexGetter = document.querySelector(".project");
        const index = indexGetter.classList[2];
        if(taskName.checkValidity() && taskDescription.checkValidity() && taskDate.checkValidity() ){
            const task = Task(taskName.value, taskDescription.value, taskDate.value);
            const parsedProjects = JSON.parse(localStorage.getItem("projects"));
            parsedProjects[index].tasks.push(task);
            localStorage.setItem("projects", JSON.stringify(parsedProjects))
            updateTasks(parsedProjects[index], index);
            dialog.close();
            form.reset();
            createBtn.style.display = "none"
        } else{
            taskName.reportValidity();
            taskDescription.reportValidity();
            taskDate.reportValidity();
        }
    });

})();

const editTaskInitializer = (function() {
    const form = document.querySelector(".task-dialog form");
    const taskName = document.querySelector(".task-dialog form #taskName");
    const taskDescription = document.querySelector(".task-dialog form #description");
    const taskDate = document.querySelector(".task-dialog form #dueDate");
    const dialog = document.querySelector(".task-dialog");
    const edit = document.querySelector(".editCreate .edit");

    edit.addEventListener("click", (event) => {
        event.preventDefault();
        const projectIndex = document.querySelector(".content .project").classList[2];
        const taskIndex = edit.id;
        const parsedProjects = JSON.parse(localStorage.getItem("projects"));
        const taskRef = parsedProjects[projectIndex].tasks[taskIndex];
        if(taskName.checkValidity() && taskDescription.checkValidity() && taskDate.checkValidity() ){
            taskRef.name = taskName.value;
            taskRef.description = taskDescription.value;
            taskRef.dueDate = taskDate.value;
            localStorage.setItem("projects", JSON.stringify(parsedProjects))
            updateTasks(parsedProjects[projectIndex], projectIndex);
            dialog.close();
            form.reset();
            edit.style.display = "none"
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
    const createBtn = document.querySelector(".editCreate .create");
    const editBtn = document.querySelector(".editCreate .edit");
    closeModal.addEventListener("click", () => {
        dialog.close();
        form.reset();
        createBtn.style.display = "none";
        editBtn.style.display= "none";
    })
})();

const addTaskInitializer = (index) => {
    const addTaskBtn = document.querySelector(`.create${index}`);
    const dialog = document.querySelector(".task-dialog");
    const createBtn = document.querySelector(".editCreate .create");

    addTaskBtn.addEventListener("click", () => {
        createBtn.style.display = "inline-block"
        dialog.showModal();
    });
} 

// create edit, finish, delete initializers
// lets start with delete

const deleteBtnInitializer = (projectIndex) => {
    const deleteBtn = document.querySelectorAll("#delete");
    let index = 0;
    deleteBtn.forEach((btn) => {
        const currIdx = index;
        btn.addEventListener("click", () => {
            const parsedProjects = JSON.parse(localStorage.getItem("projects"));
            console.log(projectIndex);
            parsedProjects[projectIndex].tasks.splice(currIdx,1);
            localStorage.setItem("projects", JSON.stringify(parsedProjects));
            updateTasks(parsedProjects[projectIndex], projectIndex)
        })
        index++;
    });
}

const finishBtnInitializer = (projectIndex) => {
    const finishBtn = document.querySelectorAll("#finish");
    let index = 0;
    finishBtn.forEach((btn) => {
        const currIdx = index;
        btn.addEventListener("click", () => {
            const parsedProjects = JSON.parse(localStorage.getItem("projects"));
            parsedProjects[projectIndex].tasks[currIdx].finished = !(parsedProjects[projectIndex].tasks[currIdx].finished);
            localStorage.setItem("projects", JSON.stringify(parsedProjects));
            updateTasks(parsedProjects[projectIndex], projectIndex);
        })
        index++;
    });
}

const editBtnInitializer = () => {
    const finishBtn = document.querySelectorAll("#edit");
    const editBtn = document.querySelector(".editCreate .edit");
    const dialog = document.querySelector(".task-dialog");
    const projectIndex = document.querySelector(".content .project").classList[2];

    const taskName = document.querySelector(".task-dialog form #taskName");
    const taskDescription = document.querySelector(".task-dialog form #description");
    const taskDate = document.querySelector(".task-dialog form #dueDate");


    let index = 0;
    finishBtn.forEach((btn) => {
        const currIdx = index;
        btn.addEventListener("click", () => {
            editBtn.style.display = "inline-block"
            editBtn.id = currIdx;
            const parsedProjects = JSON.parse(localStorage.getItem("projects"));
            taskName.value = parsedProjects[projectIndex].tasks[currIdx].name;
            taskDescription.value = parsedProjects[projectIndex].tasks[currIdx].description;
            dialog.showModal();
        })
        index++;
    });
}

// we might actually need this one 
// by updating only the tasks, add task buttn wont need to be called again
const updateTasks = (projectRef, projectIndex) => {
    resetTasks();
    const project = document.querySelector(".project");
    project.appendChild(contentTaskHelper(projectRef.tasks, true));
    deleteBtnInitializer(projectIndex);
    finishBtnInitializer(projectIndex);
    editBtnInitializer();
}

//create an updateContent function that only updates the content div
const updateContent = (projectRef, index) => {
    const content = document.querySelector(".content");
    resetPage(true);
    content.append(contentProjectHelper(projectRef, index, true));
    addTaskInitializer(index);
    deleteBtnInitializer(index);
    finishBtnInitializer(index);
    editBtnInitializer();
}

export {sidebarProjectBtnInitializer, viewAllBtnInitializer, placeholderInitializer}