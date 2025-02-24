import { signOut } from "firebase/auth"
import { auth } from "../general/jsfirebase.js"
import { userData } from "./jsuserdata.js"




// events

// toggle menu
// document.getElementById("menuIcon").addEventListener("click", () => { 
//      console.log("menuICon");

//      // if(window.innerWidth < 768) {
//           toggleMenu(true, true);
//      // }
// })

// document.getElementById("leaveM").addEventListener("click", () => {
//      console.log("leaveM");
//      toggleMenu(true, true)
// });




// document.body.addEventListener("resize", () => {
//      let menuBox = document.getElementById("mMenuB");
     
//      console.log("resize");

//      // maintain the menu state
//      if(window.innerWidth >= 768 && ! menuBox.classList.contains("menuOpen")) {
//           toggleMenu(true, false);
//      }

// })


document.getElementById("signoutB").addEventListener("click", () => {
     console.log("signoutB");
     signOut(auth);
})




// functions
// m level
function toggleMenu(changeDisplay, changeBackground) {
     console.log("toggleMenu");


     if(changeDisplay === true) {
          let menuHamburgerIcon  = document.getElementById("menuIcon");
          let menuBox = document.getElementById("mMenuB");
          let menuChildClass;

          let selectedMenuItems = [
               document.getElementById("mMenu"),
               document.getElementById("userSec"),
               document.querySelector("#mMenuB .brandIcon")
          ];


          if(menuBox.classList.contains("menuClosed")) {
               menuBox.classList.remove("menuClosed");
               menuBox.classList.add("menuOpen");

               menuHamburgerIcon.classList.remove("menuChildOpen");
               menuHamburgerIcon.classList.add("menuChildClosed");


               menuChildClass = "menuChildOpen";


          } else {
               menuBox.classList.remove("menuOpen");
               menuBox.classList.add("menuClosed");

               menuHamburgerIcon.classList.remove("menuChildClosed");
               menuHamburgerIcon.classList.add("menuChildOpen");


               menuChildClass = "menuChildClosed";
          }


          // add and remove classes to menu items
          for(let item = 0;  item < selectedMenuItems.length;  item++) {
               menuChildClass === "menuChildOpen" ? selectedMenuItems[item].classList.remove("menuChildClosed") : selectedMenuItems[item].classList.remove("menuChildOpen");          

               selectedMenuItems[item].classList.add(menuChildClass);
          }
          
     } 


     // if(changeBackground === true) {
     //      let backgroundEffect = document.getElementById("bgEff");

     //      backgroundEffect.style.display == "block" ? backgroundEffect.style.display = "none" : backgroundEffect.style.display = "block"
     // }

}





// s level
function menuVisualState() {
     // loadMenuBoxEffect()
     // loadNameAndType()


     // function loadNameAndType() {
     //      let userName = document.getElementById("userName");
     //      let userType = document.getElementById("userType");

     //      userName.textContent = userData.name;

     //      userType.textContent = userData.usertype == "regular"? "Usuário comum" : "Administrador";
     // }

     // function  loadMenuBoxEffect() {
     //      let menuSections = ["dashboard", "mycourses", "managecourses", "manageusers"]

     //      for(let elem in menuSections) {
     //           if(window.location.href.includes(menuSections[elem])) {
     //                // create var
     //                let selMenuBox = document.getElementById(menuSections[elem]);
     //                let imgChange = document.querySelector(`a#${menuSections[elem]} > img`);
     
     //                // css - change box and img
     //                selMenuBox.style.opacity = "1";
     //                selMenuBox.style.backgroundColor = "#000"
     
     //                if(selMenuBox.id == "dashboard" || selMenuBox.id == "mycourses") {
     //                     selMenuBox.style.borderBottom = "1px solid var(--aqua)";
     //                     selMenuBox.style.color = "var(--aqua)";
     
     //                } else {
     //                     selMenuBox.style.borderBottom = "1px solid var(--razz)";
     //                     selMenuBox.style.color = "var(--razz)";
     //                }
     
     
     //                imgChange.setAttribute("src", `../media/ico/menu/fill-${menuSections[elem]}.svg`);
     //           }
     
     //      }
     // }

}









