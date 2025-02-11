function copyData(ev) {
     let inputBox = ev.target.parentElement;
     let inputValue = inputBox.children[0].children[1].innerText;

     // exec command obsolete
     navigator.clipboard.writeText(inputValue);
}

export { copyData }