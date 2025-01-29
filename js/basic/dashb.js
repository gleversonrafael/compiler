// var
const mIcon = document.getElementById("mIcon");




mIcon.addEventListener("click", toggleMenu);
leaveM.addEventListener("click", toggleMenu);




// functions
function toggleMenu() {
     let mMenuBox = document.getElementById("mMenuB");

     if(window.innerWidth < 768) {
          if(mMenuBox.style.display == "flex") {
               mMenuBox.style.display = "none";
               mIcon.style.display = "block";
               leaveM.style.display = "flex";
     
          } else {
               mMenuBox.style.display = "flex";
               mIcon.style.display = "none";
          }

     }

}