import {resetPage, contentProjectHelper} from "./domHelper.js"
import {Projects} from "./data.js"

// sidebar project button
const sidebarProjectBtnInitializer = (index) => {
    const sidebarBtn = document.querySelector(`#p${index}`);
    sidebarBtn.addEventListener("click", () => {
        console.log(`hi ${index}`)
        updateContent(Projects[index], index);
    })    
};

// view all button
const viewAllBtnInitializer = (index) => {
    const viewAllBtn = document.querySelector(`.v${index}`);
    viewAllBtn.addEventListener("click", () => {
        console.log(`hi ${index}`)
        updateContent(Projects[index], index);
    })  
};

//creates the content page


//create an updateContent function that only updates the content div
const updateContent = (projectRef, index) => {
    const content = document.querySelector(".content");
    resetPage(true);
    content.append(contentProjectHelper(projectRef, index, true));
}

export {sidebarProjectBtnInitializer, viewAllBtnInitializer}