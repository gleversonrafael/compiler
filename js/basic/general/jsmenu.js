import { signOut } from "firebase/auth";
import { auth } from "../general/jsfirebase.js";
import { fetchOwnUserData } from "./jsuserdata.js";
import { setPageChangeEvents } from "../general/jspagechange.js";


// load defaults
document.body.addEventListener("load", loadDefaults());
setPageChangeEvents();


// toggle menu
document.getElementById("menuIcon").addEventListener("click", () => { 
     toggleMenu(true, true);
})


window.addEventListener("resize", () => {
     let menuBox = document.getElementById("mMenuB");
     let leaveMenuButton = document.getElementById("leaveM");

     if(window.innerWidth >= 768 && menuBox.classList.contains("menuClosed")) {
          toggleMenu(true, false);
     }

     toggleLeaveMenuBox();

})


// leave menu and signout
document.getElementById("leaveM").addEventListener("click", () => {
     toggleMenu(true, true);
});

document.getElementById("signoutB").addEventListener("click", () => {
     signOut(auth);
})




// functions
// m level
function loadDefaults() {
     if(window.innerWidth >= 768) {
          toggleMenu(true, false);
     }

     menuVisualState();
}


function toggleMenu(changeDisplay, changeBackground) {
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

          toggleLeaveMenuBox();


          // add and remove classes to menu items
          for(let item = 0;  item < selectedMenuItems.length;  item++) {
               menuChildClass === "menuChildOpen" ? selectedMenuItems[item].classList.remove("menuChildClosed") : selectedMenuItems[item].classList.remove("menuChildOpen");          

               selectedMenuItems[item].classList.add(menuChildClass);
          }   
     } 
}


function toggleLeaveMenuBox() {
     let leaveMenuButton = document.getElementById("leaveM");

     if(window.innerWidth >= 768 && leaveMenuButton.style.display != "none" || window.innerWidth < 768 && leaveMenuButton.style.display === "none") {
          leaveMenuButton.style.display = leaveMenuButton.style.display != "none" ? "none" : "flex"
     }
}     





// s level
async function menuVisualState() {
     loadMenuBoxEffect()
     await loadNameAndType()


     async function loadNameAndType() {
          const userData = await fetchOwnUserData();

          let userName = document.getElementById("userName");
          let userType = document.getElementById("userType");

          userName.textContent = userData.name;

          userType.textContent = userData.usertype == "regular"? "Regular" : "Administrador";
     }


     function  loadMenuBoxEffect() {
          let menuSections = ["navigate", "mycourses", "managecourses", "manageusers"]

          for(let elem in menuSections) {
               if(window.location.href.includes(menuSections[elem])) {
                    // create var
                    let selMenuBox = document.getElementById(menuSections[elem]);
                    let imgChange = document.querySelector(`a#${menuSections[elem]} > img`);
                    
     
                    // css - change box and img
                    selMenuBox.classList.add("selectedMenuBox")
     
                    imgChange.setAttribute("src", `../media/ico/menu/fill-${menuSections[elem]}.svg`);
               }
     
          }
     }

}










