// firebase
import { onSnapshot, query, where, setDoc } from "firebase/firestore";
import { usersCol } from "./fb.js";
import { userData } from "./userdata.js"


// generalVars
let createCourseForm = document.getElementById("createCourseForm");




// create course var
let backgroundEffect = document.getElementById("bgEff");
let createCourseBox = document.getElementById("createCourseBox");
let createCourseBoxPage;

let returnCreateCourse = document.getElementById("returnCreateCourse");
let acessB = document.getElementById("acessB");


// create course box events
document.getElementById("addCourseButton").addEventListener("click", toggleCreateCourseBox);

document.getElementById("closeCreateBoxButton").addEventListener("click", toggleCreateCourseBox);


document.getElementById("returnCreateCourse").addEventListener("click", changeCourseBoxPage);


acessB.addEventListener("click", (ev) => {
     ev.preventDefault();
     changeCourseBoxPage();
});




// createCourseBox
function toggleCreateCourseBox() {
     if(createCourseBox.style.display != "block") {
          showCreateCourseBox()

     } else {
          createCourseBox.style.display = "none";
          backgroundEffect.style.display = "none";
     }


     // complementary
     function showCreateCourseBox() {
          backgroundEffect.style.display = "flex";
          createCourseBox.style.display = "block";

          createCourseBoxPage = 2
     
          changeCourseBoxPage()
     }
}


function changeCourseBoxPage() {
     let searchUserBox = document.getElementById("searchUserBox");

     if(createCourseBoxPage === 2) {
          returnCreateCourse.style.display = "none"

          searchUserBox.style.display = "none";
          createCourseForm.style.display = "flex";
     
          createCourseBoxPage = 1;
     
     } else {
          returnCreateCourse.style.display = "flex"

          createCourseForm.style.display = "none";
          searchUserBox.style.display = "flex";

          createCourseBoxPage = 2;

          if(document.getElementById("userList").childElementCount == 0) {
               loadUserList()
          }
     }
}




// userlist -- grant acess
// var
let canEditAcess;
let userList = document.getElementById("userList");

// events
let grantAcessButton = document.getElementById("grantAcessButton");
let removeAcessButton = document.getElementById("removeAcessButton");

grantAcessButton.addEventListener("click", () => {
     canEditAcess = canEditAcess != true ? true : false
     editAcessState("grant");

});

removeAcessButton.addEventListener("click", () => {
     canEditAcess = canEditAcess != true ? true : false
     editAcessState("remove")
})


// functions
function loadUserList() {
     let avoidPlayerQuery = query(usersCol, where("uid", "!=", userData.uid))

     onSnapshot(avoidPlayerQuery, (dataState) => {
          dataState.forEach((userInfo) => {
               let requiredInfo = {
                    name: userInfo.data().name,
                    email: userInfo.data().email,
                    uid: userInfo.data().uid
               }

               createUserSelectBox(requiredInfo);
          })
     })


     // complementary
     function createUserSelectBox(aUserData) {
          let data = { 
               usernameP:  document.createElement("p"),
               useremailP: document.createElement("p"),
               genericLi: document.createElement("li") 
          }

          data.usernameP.textContent = aUserData.name;
          data.useremailP.textContent = aUserData.email;

          data.usernameP.classList.add("username");
          data.useremailP.classList.add("useremail");
          
          data.genericLi.id = aUserData.uid;

          data.genericLi.appendChild(data.usernameP);
          data.genericLi.appendChild(data.useremailP);

          userList.appendChild(data.genericLi);
     }
}


function editAcessState(typeOfCall) { 
     // main process
     toggleSelectBoxes()

     if(canEditAcess === true) {
          typeOfCall === "grant" ? removeAcessButton.setAttribute("disabled", "") : grantAcessButton.setAttribute("disabled", "");
     
     } else {
          typeOfCall === "grant" ? removeAcessButton.removeAttribute("disabled") : grantAcessButton.removeAttribute("disabled");
     }

     


     // complementary
     function grantOrRemoveAcess(ev) {
          let li = ev.currentTarget;

          if(typeOfCall === "grant") {
               li.classList.remove("editableBox");
               li.classList.add("acessGranted"); 
     
          } else {
               li.classList.remove("acessGranted");
          }

          console.log("acess granted");

          li.removeEventListener("click", grantOrRemoveAcess);
     }


     function toggleSelectBoxes() {
          let usersBoxes = document.querySelectorAll("#userList > li");
     

          for(let li = 0; li < usersBoxes.length; li ++) {
               // unselect boxes - analyze if a button is disabled
               if(grantAcessButton.hasAttribute("disabled") || removeAcessButton.hasAttribute("disabled")) {
                    // emendar com and
                    if(usersBoxes[li].classList.contains("editableBox")) {
                         console.log("removed editable box")

                         usersBoxes[li].classList.remove("editableBox");
                         usersBoxes[li].removeEventListener("click", grantOrRemoveAcess); 
                    } 
              

               // select boxes
               } else if(typeOfCall === "grant" && (! usersBoxes[li].classList.contains("acessGranted")) || (typeOfCall === "remove" && usersBoxes[li].classList.contains("acessGranted"))) {

                    console.log("activated");
                    usersBoxes[li].classList.add("editableBox");
                    usersBoxes[li].addEventListener("click", grantOrRemoveAcess);
               
               } 
          }
     
     }
}


// createCourse
