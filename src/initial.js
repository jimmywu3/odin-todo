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

    for(let i = 0; i < tasks.length; i++){
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
        editBtn.id = "edit";
        editBtn.textContent = "edit"
        actions.appendChild(editBtn);

        const finishBtn = document.createElement("button");
        finishBtn.id = "finish"
        finishBtn.textContent = "completed"
        actions.appendChild(finishBtn);

        taskContainer.appendChild(actions);


        tasksContainer.appendChild(taskContainer);
    }

    return tasksContainer;
}

const initialDom = (function(array, length){
    const sidebar = document.querySelector(".sidebar .projects ul");
    const content = document.querySelector(".content");
    for(let i = 0; i < length; i++){
        sidebar.appendChild(sidebarHelper(array[i].name));
        content.appendChild(contentProjectHelper(array[i].name, array[i].getTasks(), i));
    }
});

export {test, initialDom}; 