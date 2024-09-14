import editIcon from "./assets/edit.svg"
import finishIcon from "./assets/finish.svg"
import viewIcon from "./assets/view.svg"
import plusIcon from "./assets/plus.svg"

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

//contentFocused: true if only the content will be changed
const contentProjectHelper = function(projectRef, index, contentFocused){
    // creates div with class of project and p#
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project");
    projectContainer.classList.add(`p${index}`)
    /* projectContainer.id = `p${index}`; */

    //creates clickable title for project
    const titleBtn = contentTitleHelper(projectRef.name, index, contentFocused)
    projectContainer.appendChild(titleBtn);

    //need to call content taskhelper here later
    const taskContainer = contentTaskHelper(projectRef.getTasks(), contentFocused)
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

        /* Ended right here, when back get a new svg */
        const newIcon = document.createElement("img");
        newIcon.src = plusIcon;
        newBtn.appendChild(newIcon);  

        const newText = document.createElement("p");
        newText.textContent = "Add Task";
        newBtn.appendChild(newText);
        title.appendChild(newBtn);
    }

    return title;
}

const contentTaskHelper = function(tasks, contentFocused){
    const tasksContainer = document.createElement("div");
    if(!(contentFocused))
        tasksContainer.className = "tasks"
    else
        tasksContainer.className = "tasks focused"

    let limiter = tasks.length;
    if(!(contentFocused)){
        limiter = Math.min(tasks.length, 4)
    }

    for(let i = 0; i < limiter; i++){
        const taskContainer = document.createElement("div");
        taskContainer.className = `task ${i}`;

        const name = document.createElement("h2");
        name.textContent = tasks[i].name;
        taskContainer.appendChild(name);

        if(contentFocused){
            const description = document.createElement("p");
            description.textContent = tasks[i].description;
            taskContainer.appendChild(description);
        }

        const dueDate = document.createElement("p");
        dueDate.textContent = "Due Date: " + tasks[i].dueDate;
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

export {resetPage, contentProjectHelper};