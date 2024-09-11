const resetPage = () => {
    const sidebarProjects = document.querySelector(".project ul");
    let child = sidebarProjects.lastElementChild;
    while(child){
        sidebarProjects.removeChild(child);
        child = sidebarProjects.lastElementChild;
    }

    const content = document.querySelector(".content");
    child = content.lastElementChild;
    while(child){
        content.removeChild(child);
        child = contnet.lastElementChild;
    } 
}