// firebase
import { onSnapshot, query, where, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, usersCol } from "../general/jsfirebase.js";

import { currentUserBasicInformation } from "../general/jsuserdata.js";
import { showMessageBox, toggleModal, setReusableEvents } from "../general/jsreusablestructures.js";
import { closeBox, showCourses } from "./jsmanageandmycourses.js"


// assign events
if(document.location.href.includes("manage")) {
     createManageCoursesEvents();
}



// generalVars
let deleteCourseState;
let deletedCourses = [];
let canEditAcess; 


function createManageCoursesEvents() {
     setReusableEvents(["formsEvent", "cancelModalEvent"]);

     createCourseEvents();
     acessOperations("createEvents");
     deleteCourses("createEvents");
     validateFields("createEvents");

     function createCourseEvents() {
          document.getElementById("addCourseButton").addEventListener("click", async() => {
               await toggleModal("createCourseModal");
               changeCourseBoxPage(1);
          });
     
          document.getElementById("returnCreateCourse").addEventListener("click", () => {
               changeCourseBoxPage(1);
          });
     
          document.getElementById("acessB").addEventListener("click", (event) => {
               event.preventDefault();
               changeCourseBoxPage(2);
          });

          document.getElementById("createCourseForm").addEventListener("submit", (submitEvent) => {
               submitEvent.preventDefault();
               createCourse();
          });
     }
}


function changeCourseBoxPage(newSelectedPage) {
     const createCourseForm = document.getElementById("createCourseForm");
     const usersWithAcess = document.getElementById("usersWithAcessPage");

     const pageSubtitle = document.querySelector(".createdBoxSubtitle");
     const returnCreateCourse = document.getElementById("returnCreateCourse");

     switch(newSelectedPage){
          case 1:
               pageSubtitle.innerText = "Dados principais";
               returnCreateCourse.style.display = "none";

               createCourseForm.style.display = "flex";
               usersWithAcess.style.display = "none";

               break
          
          case 2:
               pageSubtitle.innerText = "Usuários com permissão";
               returnCreateCourse.style.display = "flex"

               createCourseForm.style.display = "none";
               usersWithAcess.style.display = "flex";

               if(document.getElementById("userList").childElementCount == 0) {
                    loadUserList()
               }

               break

          default:
               console.log("page Error");
     }
}









// userlist
function loadUserList() {
     const userList = document.getElementById("userList");
     const avoidPlayerQuery = query(usersCol, where("uid", "!=", currentUserBasicInformation.uid), where("deleted", "==", false));
     

     onSnapshot(avoidPlayerQuery, (dataState) => {
          dataState.forEach((userInfo) => {
               const requiredInfo = {
                    name: userInfo.data().name,
                    email: userInfo.data().email,
                    uid: userInfo.data().uid
               }

               createUserSelectBox(requiredInfo);
          })
     })


     // complementary
     function createUserSelectBox(aUserData) {
          const data = { 
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


function acessOperations(callReason) {
     if(callReason === "createEvents") {
          createEvents();
     }
     

     // main functions
     function createEvents() {
          document.getElementById("grantAcessButton").addEventListener("click", () => {
               canEditAcess = canEditAcess != true ? true : false
               editAcessState("grant");
          });
          
          document.getElementById("removeAcessButton").addEventListener("click", () => {
               canEditAcess = canEditAcess != true ? true : false
               editAcessState("remove")
          })
     }


     function editAcessState(typeOfCall) { 
          let grantAcessButton = document.getElementById("grantAcessButton");
          let removeAcessButton = document.getElementById("removeAcessButton");
     
          // main process
          toggleSelectBoxes();
     
     
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


}





function createCourse() {
     if(validateFields("multiple", "", "createCourseForm") === true) {   
          uploadCourse();
          showMessageBox("successMessage", "Curso criado!");

          document.getElementById("createCourseForm").reset();
          document.querySelectorAll("#createCourseForm .correctInput").forEach((input) => input.classList.remove("correctInput"));
     
     } else {
          showMessageBox("errorMessage", "Preencha corretamente os campos!");
     } 

     


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

               creator: currentUserBasicInformation.uid,
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




async function deleteCourses(callReason) {
     // var
     const addCourseButton = document.getElementById("addCourseButton");
     const confirmExclusion = document.getElementById("confirmExclusion");

     if(callReason === "createEvents") {
          setEventListeners();    

     } else {
          let deleteCounter = 0, responseMessage, responseType;

          // main delete process
          for(let actualId = 0; actualId < deletedCourses.length; actualId++) {
               let temporaryDoc = doc(db, "courses", deletedCourses[actualId]);
               await deleteDoc(temporaryDoc);

               deleteCounter += 1
          }

          if(deleteCounter === deletedCourses.length) {
               responseMessage = "Todos os cursos selecionados foram apagados."
               responseType = "successMessage"
          
          } else {
               responseMessage = "Nenhum ou apenas alguns dos cursos selecionados foram apagados."
               responseType = "errorMessage"
          }

          showMessageBox(responseType, responseMessage);
          await showCourses(undefined, "my");          
     }


     // aside function and events
     function setEventListeners() {
          // events
          document.getElementById("deleteCourseButton").addEventListener("click", () => {
               if(deleteCourseState != true) {
                    deleteCourseState = true;
                    selectCoursesThatWillBeDeleted();
          
               } else {
                    openDeleteCourseBox();
               }
          });

          confirmExclusion.addEventListener("click", async () => {
               closeDeleteBox(false);
               await deleteCourses();

               deletedCourses = [];
          })
          
          document.getElementById("cancelExclusion").addEventListener("click", () => {
               if(deleteCourseState === true) {
                    closeDeleteBox(false);
                    deletedCourses = [];
               }
          });
          
          document.getElementById("changeExclusion").addEventListener("click", () => {
               if(deleteCourseState === true) {
                    closeDeleteBox(true);
               }
          });
     }

     
     // main functions
     function selectCoursesThatWillBeDeleted() {
          selectCourses();

          deleteCourseState === true ? addCourseButton.setAttribute("disabled", "") : addCourseButton.removeAttribute("disabled");

     
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
     

     function openDeleteCourseBox() {
          // process
          obtainDeletedCourses();
          setDeletedCoursesCounter();
          toggleModal("deleteCourseModal");
     
     
          function obtainDeletedCourses() {
               let coursesSelected = document.querySelectorAll(".willBeDeleted");
               deletedCourses = [];
     
               coursesSelected.forEach((selectedCourse) => {
                    deletedCourses.push(selectedCourse.id);
               })
          }
     
     
          function setDeletedCoursesCounter() {
               let deletedCoursesText = document.getElementById("deletedCoursesCounter");
               
               if(deletedCourses.length > 0) {
                    let courseComplement = deletedCourses.length > 1? "cursos" : "curso"
     
                    deletedCoursesText.innerText = `Deseja excluir ${deletedCourses.length} ${courseComplement}?`
                    confirmExclusion.removeAttribute("disabled");
               
               } else {
                    deletedCoursesText.innerText = "Não há cursos a serem excluídos."
                    confirmExclusion.setAttribute("disabled", "");
               }
          }
     }
     
     function closeDeleteBox(maintain) {
          toggleModal("deleteCourseModal");
     
          if(maintain != true) {
               addCourseButton.removeAttribute("disabled");   
               deleteCourseState = false;
     
               document.querySelectorAll(".canBeDeleted, .willBeDeleted").forEach((selectedElement) => {
                    selectedElement.removeAttribute("class");
                    selectedElement.removeEventListener("click", addDeletedCourseState);
     
               })
          } 
     }
}




// validate
function validateFields(callParameter, selectedInputArray, selectedFormId) {
     switch(callParameter) {
          case "createEvents": 
               createEvents();
               break

          case "single":
               validateEachInput();
               break

          case ("multiple"):
               return finishValidation() === true ? true : false

          default:
               console.log("Something unexpected on validating inputs ocurred. A wrong call was been received.")
     }



     function createEvents() {
          let createFormFields = document.querySelectorAll("#createCourseForm > .contentFieldset > input");
          createFormFields = Array.from(createFormFields);

          for(let i = 0; i < createFormFields.length; i++) {
               createFormFields[i].onchange = () => {
                    validateFields("single", [createFormFields[i]], "createCourseForm");
               };
          }
     }


     function validateEachInput() {
          selectedInputArray.forEach(selectedInput => {
               const relatedField = selectedInput.dataset.relatedfield;
               const inputValue = selectedInput.value;
               const thisInputClasses =  selectedInput.classList

               let regularExpression;

               switch(relatedField) {
                    case "courseName":
                         regularExpression = /[\w]{2,}/;
                         break;

                    case "email":
                         regularExpression = /[\w]{2,}[@][a-z]{2,}[.][a-z]{2,}/;
                         break;

                    case "userPassword":
                         regularExpression = /[\w\d]{4,}/;
                         break;

                    case "url":
                         regularExpression = /https?:\/\/.+\..+/;
                         break

                    case "img":
                         regularExpression = /^$|https?:\/\/.+\..+/

                    default:
                         regularExpression = /^$|.{1,}/
               }

               if(regularExpression.test(inputValue) === true) {
                    if(thisInputClasses.contains("incorrectInput")) thisInputClasses.remove("incorrectInput");
                    thisInputClasses.add("correctInput");

               } else if(selectedInput.classList.contains("correctInput")) {
                    thisInputClasses.remove("correctInput");
                    thisInputClasses.add("incorrectInput");
               }
     
          })
     }


     function finishValidation() {
          const filledInputs = document.querySelectorAll(`#${selectedFormId} .requiredInput.correctInput`);
          const minimumLength = document.querySelectorAll(`#${selectedFormId} .requiredInput`).length;

          return filledInputs.length === minimumLength
     }

}




// save course data
async function saveCourseData(courseIdentifier, oldData) {
     const obtainedNewData = obtainEditedCourseData(), 
          isThereNewData = Object.keys(obtainedNewData).length > 0, 
          inputsAreNotValidated = document.querySelectorAll(`#${courseIdentifier} .incorrectInput`).length === 0;
     ;

     if(isThereNewData && inputsAreNotValidated) {
          const docThatWillBeUpdated = doc(db, "courses", courseIdentifier);

          await updateDoc(docThatWillBeUpdated, obtainedNewData)
          .then(() => {
               showMessageBox("successMessage", "Curso alterado! atualize para visualizar as mudanças. ");
               closeBox(courseIdentifier, "withTargetDefined");

          })
          .catch((error) => {
               showMessageBox("errorMessage", "Houve um erro ao salvar esse curso.");
               console.log(error.code)
          })

     } else {
          const errorMessage = isThereNewData ? "Preencha corretamente os dados do curso!" : "Nenhum dado do curso foi alterado.";
          showMessageBox("errorMessage", errorMessage);
     } 

     
     // complementary
     function obtainEditedCourseData() {
          let finalCourseData = {};

          verifyAndPushEditedData();

          return finalCourseData


          // aside
          function verifyAndPushEditedData() {
               const oldDataObject = Object.entries(oldData);

               oldDataObject.forEach((field) => {     
                    let fieldName = field[0], fieldValue = field[1];
                    let analyzedElementValue, analyzedComparedValue;
               
                    // set analyzed element value
                    if(fieldName != "usersWithAcess" && fieldName != "creator") {               
                         analyzedComparedValue = analyzedElementValue = document.getElementById(fieldName + courseIdentifier).value;               

                    } else if(fieldName === "usersWithAcess") {
                         // array from node list
                         const usersWithAcessList = Array.from(document.querySelectorAll(`#${courseIdentifier} .acessEditToggled`));

                         for(let i = 0; i < usersWithAcessList.length; i++) {
                              // remove edit + course identifier to obtain user id
                              usersWithAcessList[i] = usersWithAcessList[i].id.slice(courseIdentifier.length + 4);
                         }

                         analyzedElementValue = usersWithAcessList;

                         analyzedComparedValue = JSON.stringify(analyzedElementValue);
                         fieldValue = JSON.stringify(fieldValue); 
                    }

                    
                    // set changed values
                    if(fieldName != "creator" && fieldValue !== analyzedComparedValue ) {                             
                         Object.defineProperty(finalCourseData, fieldName, {
                              value: analyzedElementValue, enumerable: true
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
     if(usersWithAcessInCourse.length > 0) toggleUsersWithAcess();


     async function createList() {  
          let createdContent;
          let stepperGroup;
          
          const acessControlPageTitle = document.createElement("h3");
          acessControlPageTitle.innerText = "Usuários com acesso"

          const selectedQuery = query(usersCol, where("uid", "!=", currentUserBasicInformation.uid), where("deleted", "==", false));

          
          await getDocs(selectedQuery)
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

          acessControl.appendChild(acessControlPageTitle)
          acessControl.appendChild(acessList);

          createdContent.insertBefore(acessControl, stepperGroup);
     }
     

     function changeThisUserAcess(userBoxClicked) {
          const elementClasses = userBoxClicked.classList;

          elementClasses.add("changedJS");
          elementClasses.contains("acessEditToggled") ? elementClasses.remove("acessEditToggled") : elementClasses.add("acessEditToggled");
     }


     function toggleUsersWithAcess() {
          for(let currentUser = 0; currentUser < usersWithAcessInCourse.length; currentUser ++) {
               let selectedBoxId = `edit${courseIdentifier + usersWithAcessInCourse[currentUser]}`;
               document.getElementById(selectedBoxId).classList.add("acessEditToggled");
          }

     }
}


// exports
export { createAcessControl, saveCourseData, validateFields };










