import "./styles.css";
import { test, createDom } from "./initial.js";
/* import {Project, Task} from "./project-task.js"; */
import { Projects } from "./data.js";
console.log(test());
console.log(JSON.stringify(Projects))
console.log(JSON.parse(JSON.stringify(Projects))[0])

createDom(Projects, Projects.length);

