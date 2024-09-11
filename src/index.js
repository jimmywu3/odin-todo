import "./styles.css";
import { test, createDom } from "./initial.js";
/* import {Project, Task} from "./project-task.js"; */
import { Projects } from "./data.js";
console.log(test());

createDom(Projects, Projects.length);

