import { signOut } from "firebase/auth"
import { auth } from "./fb.js"


// var
let signoutB = document.querySelector("button#signoutB");
const mIcon = document.getElementById("mIcon");




// events
mIcon.addEventListener("click", toggleMenu);
leaveM.addEventListener("click", toggleMenu);
document.body.addEventListener("resize", toggleMenu);

signoutB.addEventListener("click", () => {
     signOut(auth);
})




// functions
function toggleMenu() {
     console.log("menu toggle")
     let mMenuBox = document.getElementById("mMenuB");

     if((window.innerWidth >= 768) || (window.innerWidth < 768)) {
          changeMenuDisplay()   
     }
      

     // compl
     function changeMenuDisplay() {
          // Menu is not open
          if(mMenuBox.style.display != "flex") {
               mMenuBox.style.display = "flex";
               mIcon.style.display = "none";
          
          } else if(window.innerWidth < 768) {
               mMenuBox.style.display = "none";
               mIcon.style.display = "block";
          }
     }
}



