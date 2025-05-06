import { signOut } from "firebase/auth";
import { auth } from "../general/jsfirebase.js";
import { fetchOwnUserData } from "./jsuserdata.js";
import { setPageChangeEvents } from "../general/jspagechange.js";
import { refreshAnimations } from "./jsreusablestructures.js"

// asyncronous unique events - are loaded only when menu hasn't been loaded before.
const mMenuB = document.getElementById("mMenuB");
if(mMenuB && mMenuB.dataset.loadState != "true") {
     await loadDefaults()
     setPageChangeEvents();

     mMenuB.dataset.loadState = "true";
}



async function loadDefaults() {
     if(window.innerWidth >= 768) {
          toggleMenu();
     }

     setMenuEvents();
     await loadNameAndType();
     changeSelectedBoxStyle();
}

function setMenuEvents() {
     document.getElementById("signoutB").onclick = () => {signOut(auth)};

     // similar
     document.getElementById("leaveM").addEventListener("click", () => {
          toggleMenu();
     });

     document.getElementById("menuIcon").addEventListener("click", () => { 
          toggleMenu();
     })

     // bug fix
     window.addEventListener("resize", () => {
          const menuBox = document.getElementById("mMenuB");
          if(window.innerWidth >= 768 && menuBox.classList.contains("menuClosed")) toggleMenu();
          
          toggleLeaveMenuBox();
     });
}


// open / close menu
function toggleMenu() {
     const menuHamburgerIcon  = document.getElementById("menuIcon"),
          menuBox = document.getElementById("mMenuB")
     ;

     let selectedMenuItems = [
          document.getElementById("mMenu"),
          document.getElementById("userSec"),
     ];

     let menuChildClass, selectedAnimation, newState, showItemDelay;


     if(menuBox.classList.contains("menuClosed")) {
          newState = "Open"
          selectedAnimation = "";

          menuBox.classList.remove("menuClosed");
          menuHamburgerIcon.classList.add("menuChildClosed");

     } else {
          newState = "Closed"
          selectedAnimation = "0.3s menuANIM linear reverse forwards";

          menuBox.classList.remove("menuOpen");
          menuHamburgerIcon.classList.add("menuChildOpen");
     }

     finishInitialSetups()
     refreshAnimations([menuBox], [selectedAnimation]);
     toggleLeaveMenuBox();
     setTimeout(toggleMenuItems, 200);


     function finishInitialSetups() {
          menuBox.classList.add("menu"+newState);
          menuHamburgerIcon.classList.remove(`menuChild${newState}`);
          menuChildClass = `menuChild${newState}`;

          // hide/ show items before appearing / dissapearing
          for(let item = 0;  item < selectedMenuItems.length;  item++) {
               selectedMenuItems[item].style.opacity = newState === "Open" ? 1 : 0;
          };
     }

     function toggleMenuItems() {
          for(let item = 0;  item < selectedMenuItems.length;  item++) {
               menuChildClass === "menuChildOpen" ? selectedMenuItems[item].classList.remove("menuChildClosed") : selectedMenuItems[item].classList.remove("menuChildOpen");
     
               selectedMenuItems[item].classList.add(menuChildClass);
          }
     }
}

function toggleLeaveMenuBox() {
     const leaveMenuButton = document.getElementById("leaveM");
     // conditions === bug fixes
     if(window.innerWidth >= 768 && leaveMenuButton.style.display != "none" || window.innerWidth < 768 && leaveMenuButton.style.display === "none") {
          leaveMenuButton.style.display = leaveMenuButton.style.display != "none" ? "none" : "flex"
     }
}     

// user data 
async function loadNameAndType() {
     const userData = await fetchOwnUserData();
     const userName = document.getElementById("userName");
     const userType = document.getElementById("userType");

     userName.textContent = userData.name;
     userType.textContent = userData.usertype == "regular"? "Regular" : "Administrador";
}


// reusable
function  changeSelectedBoxStyle() {
     const selectedBox = document.getElementsByClassName("selectedMenuBox").item(0);

     if(selectedBox) {
          const selectedIcon = document.querySelector(`#${selectedBox.id} img`);
          selectedIcon.src = selectedIcon.src.replace(/fill-/, "");
          selectedBox.classList.remove("selectedMenuBox");
     }

     updateSelectedItem();


     function updateSelectedItem() {
          const menuPages = ["home", "mycourses", "managecourses", "manageusers"]

          for(let selectedPage = 0; selectedPage < menuPages.length; selectedPage++) {
               if(window.location.href.includes(menuPages[selectedPage])) {
                    changeMenuBoxVisual(menuPages[selectedPage], `${menuPages[selectedPage]}JS`);
               }
          }

          function changeMenuBoxVisual(pageName, menuBoxId) {
               const selectedMenuBox = document.getElementById(menuBoxId);
               const changedIcon = document.querySelector(`#${menuBoxId} img`);

               selectedMenuBox.classList.add("selectedMenuBox");
               changedIcon.setAttribute("src", `../media/ico/menu/fill-${pageName}.svg`);
          }
     }
}


export { changeSelectedBoxStyle }









