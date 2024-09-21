import {resetPage, resetTasks, contentProjectHelper, contentTaskHelper} from "./domHelper.js"
import { Project, Task } from "./project-task.js"
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

const placeholderInitializer = (index) => {
    const placeholder = document.querySelector(`.p-${index} .tasks .placeholder`);
    placeholder.addEventListener("click", () => {
        updateContent(Projects[index], index);
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
            Projects[index].addTask(task);
            updateTasks(Projects[index]);
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
        const taskRef = Projects[projectIndex].getTasks()[taskIndex];
        if(taskName.checkValidity() && taskDescription.checkValidity() && taskDate.checkValidity() ){
            taskRef.changeTaskName(taskName.value);
            taskRef.changeTaskDescription(taskDescription.value)
            taskRef.changeDueDate(taskDate.value)
            updateTasks(Projects[projectIndex]);
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

const deleteBtnInitializer = (projectRef) => {
    const deleteBtn = document.querySelectorAll("#delete");
    let index = 0;
    deleteBtn.forEach((btn) => {
        const currIdx = index;
        btn.addEventListener("click", () => {
            projectRef.removeTask(currIdx);
            updateTasks(projectRef)
        })
        index++;
    });
}

const finishBtnInitializer = (projectRef) => {
    const finishBtn = document.querySelectorAll("#finish");
    let index = 0;
    finishBtn.forEach((btn) => {
        const currIdx = index;
        btn.addEventListener("click", () => {
            projectRef.getTasks()[currIdx].changeFinished();
            updateTasks(projectRef);
        })
        index++;
    });
}

const editBtnInitializer = (projectRef) => {
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
            taskName.value = Projects[projectIndex].getTasks()[currIdx].name;
            taskDescription.value = Projects[projectIndex].getTasks()[currIdx].description;
            dialog.showModal();
        })
        index++;
    });
}

// we might actually need this one 
// by updating only the tasks, add task buttn wont need to be called again
const updateTasks = (projectRef) => {
    resetTasks();
    const project = document.querySelector(".project");
    project.appendChild(contentTaskHelper(projectRef.getTasks(), true));
    deleteBtnInitializer(projectRef);
    finishBtnInitializer(projectRef);
    editBtnInitializer(projectRef);
}

//create an updateContent function that only updates the content div
const updateContent = (projectRef, index) => {
    const content = document.querySelector(".content");
    resetPage(true);
    content.append(contentProjectHelper(projectRef, index, true));
    addTaskInitializer(index);
    deleteBtnInitializer(projectRef);
    finishBtnInitializer(projectRef);
    editBtnInitializer(projectRef);
}

export {sidebarProjectBtnInitializer, viewAllBtnInitializer, placeholderInitializer}