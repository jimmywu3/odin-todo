import {resetPage, contentProjectHelper} from "./domHelper.js"

// sidebar project button

// view all button

//create an updateContent function that only updates the content div
const updateContent = (projectRef, index) => {
    resetPage();
    contentProjectHelper(projectRef, index, true);
}