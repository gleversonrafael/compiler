import { signOut } from "firebase/auth"
import { auth } from "./fb.js"


// var
let signoutB = document.querySelector("button#signoutB");
let mMenuBox = document.getElementById("mMenuB");
const mIcon = document.getElementById("mIcon");




// events
mIcon.addEventListener("click", toggleMenu);
leaveM.addEventListener("click", toggleMenu);
document.body.addEventListener("load", menuVisualState)



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
     let navSections = ["dashboard", "mycourses", "managecourses", "allcourses", "manageusers"]

     if(window.location.href.includes(navSections)) {
          let elem = document.getElementById(navSections[1])

     }

}







