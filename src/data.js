import {Project, Task} from "./project-task.js";

const Projects = [];
const project1 = Project("Test1");
const task1 = Task("task1", "task1 description");
project1.addTask(task1);
const task2 = Task("task2", "task2 description");
project1.addTask(task2);
const task3 = Task("task3", "task3 description");
project1.addTask(task3);
const task4 = Task("task4", "task4 description");
project1.addTask(task4);
const task5 = Task("task5", "task4 description");
project1.addTask(task5);
const task6 = Task("task6", "task4 description");
project1.addTask(task6);
const task7 = Task("task7", "task4 description");
project1.addTask(task7);
const task8 = Task("task8", "task4 description");
project1.addTask(task8);
const task9 = Task("task9", "task4 description");
project1.addTask(task9);


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