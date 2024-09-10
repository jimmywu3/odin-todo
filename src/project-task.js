const Project = (function(name) {
    let tasks = [];

    function changeProjectName(name){
        this.name = name;
    }

    const addTask = (task) => {
        tasks.push(task);
    }

    const removeTask = (index) =>{
        tasks.splice(index, 1);
    }

    const getTasks = () => {
        return tasks;
    }

    return {name, changeProjectName, addTask, removeTask, getTasks};
});

const Task = (function(name, description) {
    function changeTaskName(name){
        this.name = name;
    }

    function changeTaskDescription(description){
        this.description = description;
    }

    return{name, description, changeTaskName, changeTaskDescription}
});

export {Project, Task}
