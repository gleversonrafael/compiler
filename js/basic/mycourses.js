console.log("myCourses acessado!");

function copyData(ev) {
     let fieldValue = ev.currentTarget.parentElement.children[1].innerText;
     navigator.clipboard.writeText(fieldValue);
}

export { copyData }