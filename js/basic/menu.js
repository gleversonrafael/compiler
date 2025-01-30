import { signOut } from "firebase/auth"
import { auth } from "./fb.js"


// var
let signoutB = document.querySelector("button#signoutB");
let mMenuBox = document.getElementById("mMenuB");
const mIcon = document.getElementById("mIcon");




// events
// menu state
document.body.addEventListener("load", menuVisualState())

// toggle menu
mIcon.addEventListener("click", toggleMenu);
leaveM.addEventListener("click", toggleMenu);
window.addEventListener("resize", () => {
     if(mMenuBox.style.display == "none" && window.innerWidth > 768) {
          // only happens when the user, from a pc screen, changes viewpowrt to one lighter than 768px and open and closes the menu
          toggleMenu();
     }     
});





signoutB.addEventListener("click", () => {
     signOut(auth);
})




// functions
// m level
function toggleMenu() {
     changeMenuDisplay()   
      

     // compl
     function changeMenuDisplay() {
          // Menu is not open
          if(mMenuBox.style.display != "flex") {
               mMenuBox.style.display = "flex";
               mIcon.style.display = "none";
          
          // close menu -- only mob
          } else {
               mMenuBox.style.display = "none";
               mIcon.style.display = "block";
          }
     }
}




// s level
function menuVisualState() {
     let menuSections = ["dashboard", "mycourses", "managecourses", "allcourses", "manageusers"]


     for(let elem in menuSections) {
          if(window.location.href.includes(menuSections[elem])) {
               // create var
               let selMenuBox = document.getElementById(menuSections[elem]);
               let imgChange = document.querySelector(`a#${menuSections[elem]} > img`);

               // css - change box and img
               selMenuBox.style.opacity = "1";
               selMenuBox.style.backgroundColor = "#000"
               selMenuBox.style.borderBottom = "1px solid var(--aqua)";
               selMenuBox.style.color = "var(--aqua)";

               imgChange.setAttribute("src", `../media/ico/menu/fill-${menuSections[elem]}.svg`);
          }

     }

}







