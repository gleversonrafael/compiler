// other js
import { copyData } from "./jsmycourses.js"
import { createAcessControl, saveCourseData } from "./jsmanagecourses.js"
import { fetchOwnUserData, currentUserUID } from "../general/jsuserdata.js"
import { removeSkeletons } from "./../general/jsload.js"


// firebase
import { onSnapshot, collection, where, query } from "firebase/firestore";
import { db } from "../general/jsfirebase.js";


// global var
let coursesData = {};
let othersData = {};
let pageType = window.location.href.includes("mycourses") ? "myCourses" : "manageCourses"


// async events
await showCourses(undefined, "my");
removeSkeletons();


// functions
async function showCourses(searchedContent, callPurpose) {
     if(await obtainAllowedCoursesData(searchedContent) === true) {
          createCoursesBoxes();

          if(pageType === "manageCourses" && callPurpose === "my") {
               showCourses(searchedContent, "others");
          }
     
     } else {
          eraseColumns()
     }


     // main functions
     async function obtainAllowedCoursesData(searchedContent) {
          callPurpose === "others" ? othersData = {} : coursesData = {}
     
          // query process
          let coursesQuery = createQuery();
     
          let insertData = new Promise((dataObtained, noData) => {
               onSnapshot(coursesQuery, (dataState) => {
                    // add value to coursesData and othersData
                    dataState.forEach((currentDocument)=> {
                         Object.defineProperty(obtainDataSelected(callPurpose), currentDocument.id, {
                              value: currentDocument.data(),
                              writable: true,
                              configurable: true,
                              enumerable: true,
          
                         })
                    })
     
     
                    // is there any data obtained?
                    Object.entries(obtainDataSelected(callPurpose)).length === 0 ? noData() : dataObtained();
               })
          })
     
     
     
          // process
          let insertDataResult;
     
     
          await insertData
          .then(() => {
               insertDataResult = true
     
          })
          .catch(() => {
               insertDataResult = false
          })
     
          return insertDataResult
     
     
          function createQuery() {
               let queryResult;
               let whereType = obtainPageWhere();
     
               if(searchedContent === undefined || searchedContent === "") {
                    queryResult = query(collection(db, "courses"), whereType);
     
               } else {
                    queryResult = query(collection(db, "courses"), whereType, where("courseName", "==", searchedContent));
               }
     
               
               return queryResult
     
     
               // compl
               function obtainPageWhere() {
                    let whereResult;
     
                    if(pageType === "myCourses") {
                         whereResult = where("usersWithAcess", "array-contains", currentUserUID);
     
                    } else if(callPurpose != "others"){
                         whereResult = where("creator", "==", currentUserUID);
                    } else {
                         whereResult = where("creator", "!=", currentUserUID);
                    }
     
     
                    return whereResult;
               }    
          }
     }


     function createCoursesBoxes() {
          let coursesColumns = callPurpose != "others" ? document.querySelectorAll("#coursesA > .coursesColumn") : document.querySelectorAll("#othersA > .coursesColumn");
     
     
          coursesColumns.forEach((column) => {
               column.innerHTML = "";
          })
     
          createBoxes()
     

     
          function createBoxes() {
               Object.entries(obtainDataSelected(callPurpose)).forEach((data) => {
                    // var
                    let courseId = data[0];
                    let courseValues = data[1];
                    let selectedColumn = coursesColumns[0].childElementCount > coursesColumns[1].childElementCount? coursesColumns[1]: coursesColumns[0];
     
     
                    let courseProperties = {
                         courseBox: document.createElement("div"), 
                         title: document.createElement("h1"),
                         platform: document.createElement("h2"),
                    }
     
     
                    // ids, classes and events
                    courseProperties.courseBox.id = courseId;
                    courseProperties.courseBox.onclick = openBox;
                    courseProperties.courseBox.classList.add("closed");
     
                    // set data
                    courseProperties.title.innerText = courseValues.courseName;
                    
     
                    // create elements -- continue
                    if(courseValues.img.length > 1) {
                         courseProperties.courseBox.appendChild(createImg());
                    }
     
                    courseProperties.courseBox.appendChild(courseProperties.title);
     
                    if(courseValues.coursePlatform.length > 0) {
                         Object.defineProperty(courseProperties, "platform", {
                              value: document.createElement("h2"),
                              configurable: true, writable: true
                         });

                         courseProperties.platform.innerText = `Plataforma:${courseValues.coursePlatform}`;
                         courseProperties.courseBox.appendChild(courseProperties.platform);
                    }
                    
                    selectedColumn.appendChild(courseProperties.courseBox);
     
     
                    // compl
                    function createImg() {
                         let img = document.createElement("img");
                         img.setAttribute("src", courseValues.img);
     
                         return img
                    }
               })
          }  
     
     }


     // erase columns
     function eraseColumns() {
          let coursesColumns;
     
          if(obtainDataSelected(callPurpose) === othersData) {
               coursesColumns = document.querySelectorAll("#othersA > .coursesColumn");
     
          } else {
               coursesColumns = document.querySelectorAll("#coursesA > .coursesColumn");
          }
      
     
          coursesColumns.forEach((column) => {
               column.innerHTML = "";
          });
     }
     
}




// open box
function openBox(event) {  
     let courseBox = event.currentTarget;
     let courseId;
     let elementData;

     if(! courseBox.classList.contains("open") && meetConditions(event.target)) {
          let courseAreaClicked = courseBox.parentElement.parentElement.id;

          courseId = courseBox.id;
          courseBox.classList.remove("closed");
     
          elementData = obtainDataSelected(courseAreaClicked === "coursesA" ? "my" : "others")[courseId];


          showElements(courseId);
     }
     
 


     // complementary   
     function meetConditions(clickedElement) {
          let temporaryDeletedCourses = document.querySelectorAll(".coursesColumn > .canBeDeleted, .coursesColumn > .willBeDeleted").length;


          if(temporaryDeletedCourses === 0 && ! clickedElement.classList.contains("closeBoxButton")) {
               return true
          
          } else {
               return false
          }
     }


     function showElements(courseId) {
          let createdContent;
          let closeButton = document.createElement("button");
          let specialButton;

          courseBox.classList.add("open");

          createPages();
          changePage(1, courseId);



        


          // complementary
          function createPages() {
               let elementProperties = [{ email: "E-mail" }, { userPassword: "Senha"}];


               // main process
               setSettingsBeforeCreatingPages();
               createAndAllocatePages();
               setFinalSettingsAndAllocateFathers();


               // complementary
               function setSettingsBeforeCreatingPages() {
                    if(pageType === "myCourses") {    
                         specialButton = document.createElement("a");
                         specialButton.href = elementData.url;
                         specialButton.target = "_blank";
                         specialButton.innerText = "Acessar";
     
                         createdContent = document.createElement("div");
     
                    } else {
                         elementProperties.unshift({ courseName: "Título"}, { coursePlatform: "Plataforma"});

                         elementProperties.push({ url: "URL"}, { img: "URL da imagem"})
     
                         specialButton = document.createElement("input");
                         specialButton.type = "submit";                         
                         specialButton.value = "Alterar";
     
     
                         createdContent = document.createElement("form");
                         createdContent.setAttribute("id", `form${courseId}`);

                         createdContent.setAttribute("autocomplete", "off");
                         createdContent.setAttribute("novalidate", "");

                         createdContent.addEventListener("submit", (genericSubmitEvent) => {
                              genericSubmitEvent.preventDefault();                              
                              saveCourseData(courseId, elementData);
                         
                         })
                    }
               }



               function createAndAllocatePages() {
                    let temporaryCreatedPages = [];
                    let pageCounter = 0;


                    for(let elementCounter = 0; elementCounter < elementProperties.length; elementCounter++) {
                         // increment pages -- each pair elememtCounter = new page (starting from 0)
                         if(elementCounter % 2 === 0) {
                              pageCounter += 1

                              let temporaryPage = document.createElement("div");

                              temporaryPage.classList.add("flex-col");
                              temporaryPage.classList.add(`coursePage${pageCounter}`);
                              temporaryPage.classList.add("aCoursePage");

                              temporaryPage.appendChild(createRegularPagesTitle(pageCounter));
                         

                              temporaryCreatedPages.push(temporaryPage);

                              createdContent.appendChild(temporaryCreatedPages[temporaryCreatedPages.length - 1]);
                         }


                         let createdField = createASingleElement(elementProperties[elementCounter]);


                         // allocate pages
                         temporaryCreatedPages[temporaryCreatedPages.length - 1].appendChild(createdField);
                    }
               }


               function createRegularPagesTitle(pageCounter) {
                    let pageTitle = document.createElement("h3");

                    switch(pageCounter) {
                         case 1:
                              pageTitle.innerText = "Dados do curso";
                              break;

                         case 2:
                              pageTitle.innerText = "Dados do usuário";
                              break;

                         case 3:
                              pageTitle.innerText = "URLS";
                              break;

                         default: 
                              pageTitle.innerText = "Página inexistente";
                    }


                    return pageTitle
               }


               function createASingleElement(elementProperty) {
                    // var
                    let propertyString = Object.values(elementProperty);
                    let propertyName = Object.keys(elementProperty);

                    let temporaryName;
                    let temporaryValue;
                    let temporaryField;


                    if(pageType === "myCourses") {
                         temporaryField = document.createElement("div");

                         temporaryName = document.createElement("p");
                         temporaryValue = document.createElement("p");

                         // name Properties
                         temporaryValue.innerText = elementData[propertyName];


                    } else {
                         temporaryField = document.createElement("fieldset");  

                         temporaryName = document.createElement("label"); 
                         temporaryValue = document.createElement("input");  


                         // nameProperties
                         temporaryName.setAttribute("for", propertyName + courseId);


                         // valueProperties
                         temporaryValue.id =  propertyName + courseId;
                         temporaryValue.name = propertyName

                         temporaryValue.value = elementData[propertyName];
                         temporaryValue.placeholder = elementData[propertyName];


                         // fix type
                         if(propertyName != "courseName" && propertyName != "coursePlatform" && propertyName != "img") {
                              temporaryValue.type = propertyName;
                         
                         } else if(propertyName === "userPassword") {
                              temporaryValue.type = "password"


                         } else if(propertyName == "img") {
                              temporaryValue.type = "url";

                         } else {
                              temporaryValue.type = "text";
                         }
                    }


                    // nameProperties
                    temporaryName.innerText = Object.values(propertyString);

                    // value Properties
                    temporaryName.classList.add("fieldName");
                    temporaryValue.classList.add("fieldValue");


                    // main process
                    temporaryField.appendChild(temporaryName);
                    temporaryField.appendChild(temporaryValue);


                    return temporaryField
               }


               function createSteppers() {
                    let createdElements = {
                         stepperGroup: document.createElement("div"),
                         steppers: document.createElement("div"),

                         resetForm: document.createElement("input"),
                         
                         stepButtons: {
                              backwardStepper: document.createElement("input"),
                              forwardStepper: document.createElement("input")
                         },
                         
                         stepperNumber: document.createElement("input"),
                    }     

                    setSettings()
                    insertElements()
                    
                   
                    // complementary
                    function setSettings() {
                         createdElements.stepperGroup.classList.add("stepperGroup");
                         createdElements.steppers.classList.add("steppers")
     
                         createdElements.resetForm.setAttribute("type", "reset");
                         createdElements.resetForm.setAttribute("value", "Redefinir");
     
                         createdElements.stepperNumber.setAttribute("type", "number");
                         createdElements.stepperNumber.setAttribute("value", 1);
                         createdElements.stepperNumber.setAttribute("min", 1);
                         createdElements.stepperNumber.setAttribute("max", 4);

                         createdElements.stepperNumber.classList.add("stepperNumber");
                         
                         createdElements.stepperNumber.addEventListener("change", (ev) => {
                              let inputValue = ev.currentTarget.valueAsNumber

                              if(inputValue >= 1 && inputValue < 5) {
                                   changePage(ev.currentTarget.valueAsNumber, courseId);
                              
                              } else {
                                   ev.currentTarget.valueAsNumber = 1;
                              }
                              
                         });
     
     
                         Object.entries(createdElements.stepButtons).forEach((stepper) => {
                              // stepper[0] = names
                              // stepper[1] = values / element
     
                              stepper[1].classList.add(stepper[0]);
                              stepper[1].setAttribute("name", stepper[0]);
                              stepper[1].setAttribute("type", "button");

                              // changePage with steppers buttons
                              stepper[1].addEventListener("click", (ev) => {
                                   let inputValue = createdElements.stepperNumber.valueAsNumber;

                                   if(inputValue < 4 && stepper[1].classList.contains("forwardStepper")) {
                                        inputValue += 1

                                   } else if(inputValue > 1 && stepper[1].classList.contains("backwardStepper")) {
                                        inputValue -= 1;
     
                                   }

                                   createdElements.stepperNumber.valueAsNumber = inputValue;
                                   changePage(inputValue, courseId);
                              })
                         })
                    }

                    function insertElements() {
                         createdElements.steppers.appendChild(createdElements.stepButtons.backwardStepper);
                         createdElements.steppers.appendChild(createdElements.stepperNumber);
                         createdElements.steppers.appendChild(createdElements.stepButtons.forwardStepper);
     
                         createdElements.stepperGroup.appendChild(createdElements.resetForm);
                         createdElements.stepperGroup.appendChild(createdElements.steppers);
     
                         createdContent.appendChild(createdElements.stepperGroup);
                    }
               }


               function setFinalSettingsAndAllocateFathers() {
                    createdContent.classList.add("createdContent");
                    closeButton.classList.add("closeBoxButton");

                    closeButton.innerText = "Fechar";
                    closeButton.addEventListener("click", closeBox);

                    courseBox.appendChild(createdContent);


                    // add copy button or steppers and redefine button
                    if(pageType === "myCourses") {                      
                         let fieldsThatCanBeCopied = document.querySelectorAll(`div#${courseId} > .createdContent > div > div`);

                         fieldsThatCanBeCopied.forEach((selectedField) => {
                              let copyButton = document.createElement("button");
                              copyButton.classList.add("copyButton");
                              copyButton.addEventListener("click", copyData);

                              selectedField.appendChild(copyButton);
                         })
                    
                    } else { 
                         createSteppers();
                         createAcessControl(courseId, elementData.usersWithAcess);
                    } 

                    createdContent.appendChild(closeButton);
                    createdContent.appendChild(specialButton);
               }
          }
     }
}




// change page
// deslocar para managecourses
function changePage(selectedPage, courseId) {
     let currentOpenPage = document.querySelector(`div#${courseId} .openPage`);  

     let selectedBox = document.querySelector(`div#${courseId} > .createdContent > .coursePage${selectedPage}`);


     // evitar a mesma página
     if(currentOpenPage != null) {
          currentOpenPage.style.display = "none";
          currentOpenPage.classList.remove("openPage");
     } 


     selectedBox.classList.add("openPage")
     selectedBox.style.display = "flex";
}




// close box
function closeBox(ev) {
     let previouslyCreatedContent = ev.currentTarget.parentElement;
     let courseBox = previouslyCreatedContent.parentElement;

     previouslyCreatedContent.remove();

     courseBox.classList.remove("open");
     courseBox.classList.add("closed");

}




function obtainDataSelected(callPurpose) {
     if(callPurpose === "others") {
          return othersData

     } else {
          return coursesData
     }

}   




