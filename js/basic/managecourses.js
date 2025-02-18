// firebase
import { onSnapshot, query, where, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, usersCol } from "./fb.js";
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
     let avoidPlayerQuery = query(usersCol, where("uid", "!=", userData.uid));

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
     //if(analyzeInputs() && analyzeExistanceOfAsameDocument) {
          uploadCourse()

     //}


     function uploadCourse() {
          let courseNameValue = document.getElementById("courseNameInp").value;
          let coursePlatformValue = document.getElementById("coursePlatformInp").value;
          let imgValue = document.getElementById("imgInp").value;


          setDoc(doc(db, "courses", createCourseId(courseNameValue, coursePlatformValue, imgValue)), {
               courseName: courseNameValue,
               coursePlatform: coursePlatformValue,
               
               email: document.getElementById("emailInp").value,
               userPassword: document.getElementById("userPasswordInp").value,
               
               url: document.getElementById("urlInp").value,
               img: imgValue,

               creator: userData.uid,
               usersWithAcess: obtainUsers()
          })
     }


     function createCourseId(name, platform, img) {
          let imgLetter;
          let fourDigits = 0;

          // consertar espaços
          name = name.trim();
          name = name.substring(0, 4);

          platform = platform.substring(0, 4);

          // fix whitespaces

     
          while(fourDigits < 1000 || fourDigits >= 10000) {
               fourDigits = Math.floor(Math.random() * 10000);
          }

          // filled / empty
          imgLetter = img ? "f" : "e" 


          // c = course
          // console.log(`c${imgLetter + fourDigits + name + platform}`)
          return (`c${imgLetter + fourDigits + name + platform}`);
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




// save course data
async function saveCourseData(courseIdentifier, oldData) {
     let obtainedNewData = obtainEditedCourseData();

     if(Object.keys(obtainedNewData).length > 0) {
          let docThatWillBeUpdated = doc(db, "courses", courseIdentifier);

          await updateDoc(docThatWillBeUpdated, obtainedNewData);
     }

     
     // complementary
     function obtainEditedCourseData() {
          let finalCourseData = {};

          verifyAndPushEditedData();

          return finalCourseData


          // aside
          function verifyAndPushEditedData() {
               Object.entries(oldData).forEach((field) => {     
                    let fieldName = field[0];
                    let fieldValue = field[1];
                    let analyzedElementValue;
               
                    
                    // set analyzed element value
                    if(fieldName != "usersWithAcess" && fieldName != "creator") {               
                         analyzedElementValue = document.getElementById(fieldName + courseIdentifier).value;                    

                    } else if(fieldName === "usersWithAcess") {
                         // array from node list
                         let usersWithAcessList = Array.from(document.querySelectorAll(`#${courseIdentifier} .acessEditToggled`));


                         for(let i = 0; i < usersWithAcessList.length; i++) {
                              // remove edit + course identifier to obtain user id
                              usersWithAcessList[i] = usersWithAcessList[i].id.slice(courseIdentifier.length + 4);
                         }

                         analyzedElementValue = usersWithAcessList;
                    } 

                    
                    // set changed values
                    if(fieldName != "creator" && fieldValue != analyzedElementValue ) {                             
                         Object.defineProperty(finalCourseData, fieldName, {
                              value: analyzedElementValue,
                              enumerable: true
                         });
                    }
                    
               })

          }
     
          
     }
}



// create acess control and user list on edit box
async function createAcessControl(courseIdentifier, usersWithAcessInCourse) {
     // var
     let acessControl = document.createElement("div");
     let acessList = document.createElement("ul");


     // properties
     acessControl.classList.add("acessControl", "coursePage4", "aCoursePage");
     acessList.classList.add("thisCourseAcess");
     
     await createList();


     if(usersWithAcessInCourse.length > 0) {
          toggleUsersWithAcess();
     }
     


     async function createList() {  
          let createdContent;
          let stepperGroup;

          
          await getDocs(usersCol)
          .then((currentSnapshot) => {
               currentSnapshot.forEach((user) => {
                    let selectedUserData = user.data()
                    let temporaryUserBox = document.createElement("li");

                    temporaryUserBox.addEventListener("click", () => {
                         changeThisUserAcess(temporaryUserBox);
                    });

                    temporaryUserBox.innerText = selectedUserData.email;
                    temporaryUserBox.id = "edit" + courseIdentifier + selectedUserData.uid;
               
                    acessList.appendChild(temporaryUserBox);
               })

               createdContent = document.querySelector(`div#${courseIdentifier} > .createdContent`);

               stepperGroup = document.querySelector(`div#${courseIdentifier} > .createdContent > .stepperGroup`);
          })

          .catch((errorMsg) => {
               console.log(errorMsg);
          })


          acessControl.appendChild(acessList);
          createdContent.insertBefore(acessControl, stepperGroup);
     }
     

     function changeThisUserAcess(userBoxClicked) {
          userBoxClicked.classList.contains("acessEditToggled") ? userBoxClicked.removeAttribute("class") : userBoxClicked.classList.add("acessEditToggled");
     }


     function toggleUsersWithAcess() {
          for(let userWithAcess = 0; userWithAcess < usersWithAcessInCourse.length; userWithAcess ++) {
               let selectedBoxId = `edit${courseIdentifier + usersWithAcessInCourse[userWithAcess]}`;
               
               document.getElementById(selectedBoxId).classList.add("acessEditToggled");
          }

     }
}


export { createAcessControl, saveCourseData };










