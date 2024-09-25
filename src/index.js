import "./styles.css";
import { test, createDom } from "./initial.js";
/* import {Project, Task} from "./project-task.js"; */
import { Projects } from "./data.js";


createDom(Projects, Projects.length);

