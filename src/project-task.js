const Project = (function(name) {
    let tasks = [];
    return {name, tasks};
});

const Task = (function(name, description, dueDate="None", finished=false) {
    return{name, description, dueDate, finished}
});

export {Project, Task}
