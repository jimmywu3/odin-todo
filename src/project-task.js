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

    return {name, tasks, changeProjectName, addTask, removeTask, getTasks};
});

const Task = (function(name, description, dueDate="None", finished=false) {
    function changeTaskName(name){
        this.name = name;
    }

    function changeTaskDescription(description){
        this.description = description;
    }

    function changeDueDate(dueDate){
        this.dueDate = dueDate;
    }

    function changeFinished(){
        this.finished = !(this.finished);
    }

    return{name, description, dueDate, finished, changeTaskName, changeTaskDescription, changeDueDate, changeFinished}
});

export {Project, Task}
