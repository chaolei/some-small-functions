export const hasClass = (ele, classname) => {
    if(!ele) {
        return false;
    }
    if(ele.classList.contains(classname)) {
        return true;
    }
    const parent = ele.parentElement;
    return hasClass(parent, classname);
};

export const trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}