import "./styles.css";
import { test, createDom } from "./initial.js";
/* import {Project, Task} from "./project-task.js"; */
import { Projects } from "./data.js";

if(localStorage.getItem("projects") == null){
    localStorage.setItem("projects", JSON.stringify(Projects));
}

const parsedProjects = JSON.parse(localStorage.getItem("projects"));
console.log(parsedProjects) 

createDom(parsedProjects, parsedProjects.length);

