// var
let mainB = document.styleSheets[1].cssRules[4];
let loginB = document.getElementById("loginB");
console.log(mainB);


// linear gradient opacity change
loginB.addEventListener("mouseover", () => {
    mainB.style.opacity = "0.2"
})

loginB.addEventListener("mouseout", () => {
    mainB.style.opacity = "0.1"
})
