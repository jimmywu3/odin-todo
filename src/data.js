import {Project, Task} from "./project-task.js";

const Projects = [];
const project1 = Project("Test1");
const task1 = Task("task1", "task1 description");
project1.addTask(task1);
const task2 = Task("task2", "task2 description");
project1.addTask(task2);
const task3 = Task("task3", "task3 description");
project1.addTask(task3);

Projects.push(project1);

const project2 = Project("Test11");
const task11 = Task("task11", "task11 description");
project2.addTask(task11);
const task12 = Task("task12", "task12 description");
project2.addTask(task12);
const task13 = Task("task13", "task13 description");
project2.addTask(task13);
Projects.push(project2)


export { Projects }