// import { signOut } from "firebase/auth"
// import { auth } from "../general/jsfirebase.js"
// import { userData } from "./jsuserdata.js"




// // var
// let signoutB = document.querySelector("button#signoutB");

// let mMenuBox = document.getElementById("mMenuB");
// const mIcon = document.getElementById("mIcon");
// let bgEff = document.querySelector("#bgEff");
// let menuState = "closed";





// // events
// document.body.addEventListener("load", menuVisualState())


// // toggle menu
// mIcon.addEventListener("click", () => {
//      toggleMenu(true, true)
// });

// leaveM.addEventListener("click", () => {
//      toggleMenu(true, true)
// });


// window.addEventListener("resize", () => {
//      if(mMenuBox.style.display == "none" && window.innerWidth > 768) {
//           // only happens when the user, from a pc screen, changes viewpowrt to one lighter than 768px and open and closes the menu
//           toggleMenu(true, false);
          
//      }


//      // maintain the menu visual state
//      if((window.innerWidth >= 768 && bgEff.style.display == "block") || (window.innerWidth < 768 && bgEff.style.display != "block" && menuState === "open")) {
//           toggleMenu(false, true);

//      } 
// })





// signoutB.addEventListener("click", () => {
//      signOut(auth);
// })




// // functions
// // m level
// function toggleMenu(changeDisplay, changeBackground) {
//      if(changeDisplay === true) {
//           // Menu is not open
//           if(menuState === "closed") {
//                mMenuBox.style.display = "flex";
//                mIcon.style.display = "none";
               
//                menuState = "open";

//           // Menu is open
//           } else {
//                mMenuBox.style.display = "none";
//                mIcon.style.display = "block";
               
//                menuState = "closed";
//           }
//      } 


//      if(changeBackground === true) {
//           bgEff.style.display == "block" ? bgEff.style.display = "none" : bgEff.style.display = "block"
//      }

// }





// // s level
// function menuVisualState() {
//      loadMenuBoxEffect()
//      loadNameAndType()


//      function loadNameAndType() {
//           let userName = document.getElementById("userName");
//           let userType = document.getElementById("userType");

//           userName.textContent = userData.name;

//           userType.textContent = userData.usertype == "regular"? "Usuário comum" : "Administrador";
//      }

//      function  loadMenuBoxEffect() {
//           let menuSections = ["dashboard", "mycourses", "managecourses", "manageusers"]

//           for(let elem in menuSections) {
//                if(window.location.href.includes(menuSections[elem])) {
//                     // create var
//                     let selMenuBox = document.getElementById(menuSections[elem]);
//                     let imgChange = document.querySelector(`a#${menuSections[elem]} > img`);
     
//                     // css - change box and img
//                     selMenuBox.style.opacity = "1";
//                     selMenuBox.style.backgroundColor = "#000"
     
//                     if(selMenuBox.id == "dashboard" || selMenuBox.id == "mycourses") {
//                          selMenuBox.style.borderBottom = "1px solid var(--aqua)";
//                          selMenuBox.style.color = "var(--aqua)";
     
//                     } else {
//                          selMenuBox.style.borderBottom = "1px solid var(--razz)";
//                          selMenuBox.style.color = "var(--razz)";
//                     }
     
     
//                     imgChange.setAttribute("src", `../media/ico/menu/fill-${menuSections[elem]}.svg`);
//                }
     
//           }
//      }

// }









