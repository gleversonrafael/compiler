// firebase
import { onSnapshot, query, where, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db, usersCol, coursesCol } from "./fb.js";
import { userData } from "./userdata.js"


// generalVars
let createCourseForm = document.getElementById("createCourseForm");
let deleteCourseState;
let addCourseButton = document.getElementById("addCourseButton");






// create course global var
let backgroundEffect = document.getElementById("bgEff");
let createCourseBox = document.getElementById("createCourseBox");
let createCourseBoxPage;

let returnCreateCourse = document.getElementById("returnCreateCourse");
let acessB = document.getElementById("acessB");


// create course box events
addCourseButton.addEventListener("click", toggleCreateCourseBox);

document.getElementById("closeCreateCourseBox").addEventListener("click", toggleCreateCourseBox);


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

let grantAcessButton = document.getElementById("grantAcessButton");
let removeAcessButton = document.getElementById("removeAcessButton");


// events
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

          if(li.classList.contains("editableBox")) {
               typeOfCall === "grant" ? li.classList.add("acessGranted") : li.classList.remove("acessGranted");

               li.classList.remove("editableBox");   
          }

          li.removeEventListener("click", grantOrRemoveAcess)
     }


     function toggleSelectBoxes() {
          let usersBoxes = document.querySelectorAll("#userList > li");
     

          for(let li = 0; li < usersBoxes.length; li ++) {
               // unselect boxes - analyze if a button is disabled
               if(usersBoxes[li].classList.contains("editableBox") && (grantAcessButton.hasAttribute("disabled") || removeAcessButton.hasAttribute("disabled"))) {
                    usersBoxes[li].classList.remove("editableBox");
                    // couldn"t directly remove event listener from here.


               // select boxes
               } else if(typeOfCall === "grant" && (! usersBoxes[li].classList.contains("acessGranted")) || (typeOfCall === "remove" && usersBoxes[li].classList.contains("acessGranted"))) {

                    usersBoxes[li].classList.add("editableBox");
                    usersBoxes[li].addEventListener("click", grantOrRemoveAcess);
               } 
          }
     
     }
}




// createCourse
createCourseForm.addEventListener("submit", (ev) => {
     ev.preventDefault();
     createCourse();
} )


function createCourse() {
     //if(analyzeInputs()) {
          uploadCourse()

     //}


     function uploadCourse() {
          addDoc(coursesCol, {
               courseName: document.getElementById("courseNameInp").value,
               coursePlatform: document.getElementById("coursePlatformInp").value,
               
               email: document.getElementById("emailInp").value,
               userPassword: document.getElementById("userPasswordInp").value,
               
               url: document.getElementById("urlInp").value,
               img: document.getElementById("imgInp").value,

               creator: userData.uid,
               usersWithAcess: obtainUsers()
          })
     }


     function obtainUsers() {
          let usersWithAcess = [];
          let usersIds = document.querySelectorAll("#userList > .acessGranted");

          for(let iterator = 0; iterator < usersIds.length; iterator ++) {
               usersWithAcess.push(usersIds[iterator].id);
          }

          return usersWithAcess;
     }
     
}




// delete course
// var
let deletedCourses = [];
let deleteCourseBox = document.getElementById("deleteCourseBox");
let deleteCourseButton = document.getElementById("deleteCourseButton");
let submitExclusionButton = document.getElementById("confirmExclusion");


// events
deleteCourseButton.addEventListener("click", () => {
     if(deleteCourseState != true) {
          deleteCourseState = true;
          selectCoursesThatWillBeDeleted();

     } else {
          openDeleteCourseBox();
     }

});

submitExclusionButton.addEventListener("click", deleteCourses);


document.getElementById("cancelExclusion").addEventListener("click", () => {
     if(deleteCourseState === true) {
          closeDeleteBox(false);
     }
});

document.getElementById("changeExclusion").addEventListener("click", () => {
     if(deleteCourseState === true) {
          closeDeleteBox(true);
     }
});


// functions
async function deleteCourses() {
     for(let actualId = 0; actualId < deletedCourses.length; actualId++) {
          let temporaryDoc = doc(db, "courses", deletedCourses[actualId]);

          await deleteDoc(temporaryDoc)
     }

     closeDeleteBox(false);
}


function selectCoursesThatWillBeDeleted() {
     selectCourses();

     if(deleteCourseState === true) {
          addCourseButton.setAttribute("disabled", "");
     
     } else {
          addCourseButton.removeAttribute("disabled");
     }  


     // complementary
     function selectCourses() {
          let courses = document.querySelectorAll(".coursesColumn > div");

          for(let i = 0; i < courses.length; i ++) {
               if(deleteCourseState === true) {
                    courses[i].classList.add("canBeDeleted");
                    courses[i].addEventListener("click", addDeletedCourseState);

               } else {
                    courses[i].removeAttribute("class");
                    courses[i].removeEventListener("click", addDeletedCourseState);
               }
          } 
     }
}

function openDeleteCourseBox() {
     // process
     obtainDeletedCourses()
     setErrorCounter()

     backgroundEffect.style.display = "flex";
     deleteCourseBox.style.display = "flex";


     function obtainDeletedCourses() {
          let coursesSelected = document.querySelectorAll(".willBeDeleted");

          coursesSelected.forEach((selectedCourse) => {
               deletedCourses.push(selectedCourse.id);
          })
     }


     function setErrorCounter() {
          let deletedCoursesText = document.getElementById("deletedCoursesCounter");
          
          if(deletedCourses.length > 0) {
               let courseComplement = deletedCourses.length > 1? "cursos" : "curso"

               deletedCoursesText.innerText = `Deseja excluir ${deletedCourses.length} ${courseComplement}?`
               submitExclusionButton.removeAttribute("disabled");
          
          } else {
               deletedCoursesText.innerText = "Não há cursos a serem excluídos."
               submitExclusionButton.setAttribute("disabled", "");
          }
     }
}


function addDeletedCourseState(ev) {
     let selectedBox = ev.currentTarget

     if(selectedBox.classList.contains("canBeDeleted")) {
          selectedBox.classList.remove("canBeDeleted");
          selectedBox.classList.add("willBeDeleted");

     } else {
          selectedBox.classList.remove("willBeDeleted");
          selectedBox.classList.add("canBeDeleted");
     }
}


function closeDeleteBox(maintain) {
     backgroundEffect.style.display = "none";
     deleteCourseBox.style.display = "none";

     if(maintain != true) {
          addCourseButton.removeAttribute("disabled");   
          deletedCourses = [];
          deleteCourseState = false;

          document.querySelectorAll(".canBeDeleted, .willBeDeleted").forEach((selectedElement) => {
               selectedElement.removeAttribute("class");
               selectedElement.removeEventListener("click", addDeletedCourseState);

          })
     } 
}










