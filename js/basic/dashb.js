// var
const mIcon = document.getElementById("mIcon");




mIcon.addEventListener("click", toggleMenu);




// functions
function toggleMenu() {
     let mMenuB = document.getElementById("mMenuB");
     
     if(mMenuB.style.display == "flex") {
          mMenuB.style.display = "none";

     } else {
          mMenuB.style.display = "flex";
     }
}