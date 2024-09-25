import editIcon from "./assets/edit.svg"
import finishIcon from "./assets/finish.svg"
import viewIcon from "./assets/view.svg"
import plusIcon from "./assets/plus.svg"
import trashIcon from "./assets/trash.svg"

const resetPage = function(contentFocused){
    let child;
    if(!(contentFocused)){
        const sidebarProjects = document.querySelector(".projects ul");
        child = sidebarProjects.lastElementChild;
        while(child){
            sidebarProjects.removeChild(child);
            child = sidebarProjects.lastElementChild;
        }
    }

    const content = document.querySelector(".content");
    child = content.lastElementChild;
    while(child){
        content.removeChild(child);
        child = content.lastElementChild;
    } 
}

const resetTasks = function(){
    const project = document.querySelector(".project");
    const tasks = document.querySelector(".tasks");
    project.removeChild(tasks);
}

//contentFocused: true if only the content will be changed
const contentProjectHelper = function(projectRef, index, contentFocused){
    // creates div with class of project and p#
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project");
    projectContainer.classList.add(`p-${index}`);
    projectContainer.classList.add(`${index}`);

    /* projectContainer.id = `p${index}`; */

    //creates clickable title for project
    const titleBtn = contentTitleHelper(projectRef.name, index, contentFocused)
    projectContainer.appendChild(titleBtn);

    //need to call content taskhelper here later
    const taskContainer = contentTaskHelper(projectRef.tasks, contentFocused)
    projectContainer.appendChild(taskContainer);
    

    return projectContainer
}

//creates clickable title for project
const contentTitleHelper = function(name, index, contentFocused){
    const title = document.createElement("h1");
    title.className = "title";
    title.textContent = name;

    //view all button
    if(!(contentFocused)){
        const viewAllBtn = document.createElement("button");
        viewAllBtn.classList.add("view-all-button");
        viewAllBtn.classList.add(`view${index}`);


        const viewAllIcon = document.createElement("img");
        viewAllIcon.src = viewIcon;
        viewAllBtn.appendChild(viewAllIcon);  

        const viewAllText = document.createElement("p");
        viewAllText.textContent = "View All";
        viewAllBtn.appendChild(viewAllText);
        title.appendChild(viewAllBtn);
    } else {
        // create task button
        const newBtn = document.createElement("button");
        newBtn.classList.add("new-task-button");
        newBtn.classList.add(`create${index}`);

        const newIcon = document.createElement("img");
        newIcon.src = plusIcon;
        newBtn.appendChild(newIcon);  

        const newText = document.createElement("p");
        newText.textContent = "Add Task";
        newBtn.appendChild(newText);
        title.appendChild(newBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-project-button");
        deleteBtn.classList.add(`delete${index}`);

        const deleteIcon = document.createElement("img");
        deleteIcon.src = trashIcon;
        deleteBtn.appendChild(deleteIcon);

        const deleteText = document.createElement("p");
        deleteText.textContent = "Delete Project";
        deleteBtn.appendChild(deleteText);
        title.appendChild(deleteBtn);
    }

    return title;
}

const contentTaskHelper = function(tasks, contentFocused){
    const tasksContainer = document.createElement("div");
    let limiter = tasks.length;
    if(!(contentFocused)){
        tasksContainer.className = "tasks";
        limiter = Math.min(tasks.length, 4);
    }else{
        tasksContainer.className = "tasks focused";
    }


    for(let i = 0; i < limiter; i++){
        if(tasks[i].finished && !(contentFocused)){
            continue;
        }
        const taskContainer = document.createElement("div");
        taskContainer.className = `task ${i}`;
        if(tasks[i].finished){
            taskContainer.id = "finished";
        }

        const name = document.createElement("h2");
        name.textContent = tasks[i].name;
        taskContainer.appendChild(name);

        if(contentFocused){
            const description = document.createElement("p");
            description.className = "description";
            description.textContent = tasks[i].description;
            taskContainer.appendChild(description);
        }

        const dueDate = document.createElement("p");
        dueDate.textContent = "Due Date: " + tasks[i].dueDate;
        taskContainer.appendChild(dueDate)

        const actions = document.createElement("div");
        actions.className = "actions";

        if(contentFocused){
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
            finishBtn.id = "finish";
            const finishImg = document.createElement("img");
            finishImg.src = finishIcon;
            finishBtn.appendChild(finishImg);
            actions.appendChild(finishBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.id = "delete";
            const deleteImg = document.createElement("img");
            deleteImg.src = trashIcon;
            deleteBtn.appendChild(deleteImg);
            actions.appendChild(deleteBtn);

            taskContainer.appendChild(actions);
        }

        tasksContainer.appendChild(taskContainer);
    }

    if(!(contentFocused)){
        const extraBtn = document.createElement("button");
        const icon = document.createElement("img");
        const caption = document.createElement("p");
        extraBtn.classList.add("placeholder");
        //Create an addmore / view all button
        if(tasks.length <= 0){
            icon.src = plusIcon;
            caption.textContent = "No Tasks Yet, Create Some!"
        }else{
            icon.src = viewIcon;
            caption.textContent = "View All Tasks";
        }
        extraBtn.appendChild(icon);
        extraBtn.appendChild(caption);

        tasksContainer.appendChild(extraBtn);
    }

    return tasksContainer;
}

// todo:
// give contentTaskHelper a new parameter "index" so the placeholder
// elements can be given an eventListner that moves page to focused 
// content

export {resetPage, resetTasks, contentProjectHelper, contentTaskHelper};