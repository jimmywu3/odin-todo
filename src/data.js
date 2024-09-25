import {Project, Task} from "./project-task.js";

const Projects = [];
const project1 = new Project("Test1");
const task1 = Task("task1", "task1 description");
project1.tasks.push(task1); 
const task2 = Task("task2", "task2 description");
project1.tasks.push(task2);
const task3 = Task("task3", "task3 description");
project1.tasks.push(task3);
const task4 = Task("task4", "task4 description");
project1.tasks.push(task4);
const task5 = Task("task5", "task4 description");
project1.tasks.push(task5);
const task6 = Task("task6", "task4 description");
project1.tasks.push(task6);
const task7 = Task("task7", "task4 description");
project1.tasks.push(task7);
const task8 = Task("task8", "task4 description");
project1.tasks.push(task8);
const task9 = Task("task9", "task4 description");
project1.tasks.push(task9);
console.log(project1.tasks[1].finished);


Projects.push(project1);

const project2 = new Project("Test11");
const task11 = Task("task11", "task11 description");
project2.tasks.push(task11);
const task12 = Task("task12", "task12 description");
project2.tasks.push(task12);
const task13 = Task("task13", "task13 description");
project2.tasks.push(task13);
Projects.push(project2)


export { Projects }