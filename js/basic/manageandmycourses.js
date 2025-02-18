// other js
import { copyData } from "./mycourses.js"
import { createAcessControl, saveCourseData } from "./managecourses.js"
import { userData } from "./userdata.js"


// firebase
import { onSnapshot, collection, where, query } from "firebase/firestore";
import { db } from "./fb.js";



// var
const coursesCol = collection(db, "courses");
let coursesData = {};
let othersData = {};

let callPurpose;

let pageType = window.location.href.includes("mycourses") ? "myCourses" : "manageCourses"
let searchInp = document.getElementById("searchInp");





// events
searchInp.addEventListener("input", () => {
     pageType === "manageCourses" ? managerShowCourses() : showCourses(searchInp.value);
});


onSnapshot(coursesCol, ()=> {
     pageType === "manageCourses" ? managerShowCourses() : showCourses();
});



// functions
// showCourses
async function managerShowCourses() {
     callPurpose = "my";
     await showCourses(searchInp.value);

     if(pageType === "manageCourses") {
          callPurpose = "others";
          showCourses(searchInp.value);
     }
}

async function showCourses(searchedContent) {
     if(await obtainAllowedCoursesData(searchedContent) === true) {
          createCoursesBoxes();
     
     } else {
          eraseColumns()
     }
}


async function obtainAllowedCoursesData(searchedContent) {
     callPurpose === "others" ? othersData = {} : coursesData = {}

     // query process
     let coursesQuery = createQuery();

     let insertData = new Promise((dataObtained, noData) => {
          onSnapshot(coursesQuery, (dataState) => {
               // add value to coursesData and othersData
               dataState.forEach((currentDocument)=> {
                    Object.defineProperty(obtainDataSelected(), currentDocument.id, {
                         value: currentDocument.data(),
                         writable: true,
                         configurable: true,
                         enumerable: true,
     
                    })
               })


               // is there any data obtained?
               Object.entries(obtainDataSelected()).length === 0 ? noData() : dataObtained();
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



     // complementary
     function createQuery() {
          let queryResult;
          let whereType = obtainPageWhere();

          if(searchedContent === undefined || searchedContent === "") {
               queryResult = query(coursesCol, whereType);

          } else {
               queryResult = query(coursesCol, whereType, where("courseName", "==", searchedContent));
          }

          
          return queryResult


          // compl
          function obtainPageWhere() {
               let whereResult;

               if(pageType === "myCourses") {
                    whereResult = where("usersWithAcess", "array-contains", userData.uid);

               } else if(callPurpose != "others"){
                    whereResult = where("creator", "==", userData.uid);
               
               } else {
                    whereResult = where("creator", "!=", userData.uid);

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
          Object.entries(obtainDataSelected()).forEach((data) => {
               // var
               let courseId = data[0];
               let courseValues = data[1];
               let selectedColumn = coursesColumns[0].childElementCount > coursesColumns[1].childElementCount? coursesColumns[1]: coursesColumns[0];


               let courseProperties = {
                    courseBox: document.createElement("div"), 
                    title: document.createElement("h1"),
                    platform: document.createElement("h2"),
               }


               // ids and event
               courseProperties.courseBox.id = courseId;
               courseProperties.courseBox.onclick = openBox;


               // set data
               courseProperties.title.innerText = courseValues.courseName;
               courseProperties.platform.innerText = `Plataforma:${courseValues.coursePlatform}`;


               // create elements -- continue
               if(courseValues.img != undefined) {
                    courseProperties.courseBox.appendChild(createImg());
               }

               courseProperties.courseBox.appendChild(courseProperties.title);

               if(courseValues.coursePlatform != undefined) {
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



function eraseColumns() {
     let coursesColumns;

     if(obtainDataSelected() === othersData) {
          coursesColumns = document.querySelectorAll("#othersA > .coursesColumn");

     } else {
          coursesColumns = document.querySelectorAll("#coursesA > .coursesColumn");
     }
 

     coursesColumns.forEach((column) => {
          column.innerHTML = "";

     });
}



// open box
function openBox(event) {  
     // FIX OPEN BOX ON OTHER ITEMS.
     let courseId;
     let courseBox;
     let elementData;
     
     if(pageType === "myCourses" || meetConditions(event.target.tagName)) {
          // var
          courseId = obtainCourseId();
          courseBox = document.getElementById(courseId);


          // process
          if(courseBox != null && ! courseBox.classList.contains("open")) {
               changeCallPurposeViaOpenBox();
               elementData = obtainDataSelected()[courseId];

               showElements(courseId);
          }
     }




     // complementary   
     function meetConditions(clickedElement) {
          let temporaryDeletedCourses = document.querySelectorAll(".coursesColumn > .canBeDeleted, .coursesColumn > .willBeDeleted").length;


          if(temporaryDeletedCourses != 0 || (clickedElement != "DIV" && clickedElement != "H1" && clickedElement != "H2")) {
               return false
          
          } else {
               return true
          } 
     }


     function obtainCourseId() {
          if(event.target.tagName === "DIV") {
               return event.target.id

          } else {
               return event.target.parentElement.id
          }
     }
     
     
     function changeCallPurposeViaOpenBox() {
          let coursesAreaSelected = courseBox.parentElement.parentElement.id;

          if(coursesAreaSelected === "coursesA") {
               callPurpose = "my" 
          
          } else {
               callPurpose = "others"
          }
     }


     function showElements(courseId) {
          console.log("data" + elementData);

          let createdContent;
          let currentPageTitle = document.createElement("h3");
          let closeButton = document.createElement("button");
          let specialButton;

          let currentPage;

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
                         specialButton.innerText = "Confirmar";
     
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
                              let temporaryPage = document.createElement("div");
                              temporaryPage.classList.add("flex-col")

                              pageCounter += 1

                              temporaryPage.classList.add(`coursePage${pageCounter}`);
                              temporaryPage.classList.add("aCoursePage");

                              temporaryCreatedPages.push(temporaryPage);

                              createdContent.appendChild(temporaryCreatedPages[temporaryCreatedPages.length - 1]);
                         }


                         let createdField = createASingleElement(elementProperties[elementCounter]);


                         // allocate pages
                         temporaryCreatedPages[temporaryCreatedPages.length - 1].appendChild(createdField);
                    }
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
                         
                         stepperInput: document.createElement("input"),
                    }     

                    setSettings()
                    insertElements()
                    
                   
                    // complementary
                    function setSettings() {
                         createdElements.stepperGroup.classList.add("stepperGroup");
                         createdElements.steppers.classList.add("steppers")
     
                         createdElements.resetForm.setAttribute("type", "reset");
                         createdElements.resetForm.setAttribute("value", "Redefinir");
     
                         createdElements.stepperInput.setAttribute("type", "number");
                         createdElements.stepperInput.setAttribute("value", 1);
                         createdElements.stepperInput.setAttribute("min", 1);
                         createdElements.stepperInput.setAttribute("max", 4);

                         createdElements.stepperInput.classList.add("stepperInput");
                         
                         createdElements.stepperInput.addEventListener("change", (ev) => {
                              let inputValue = ev.currentTarget.valueAsNumber

                              if(inputValue > 1 && inputValue < 5) {
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
                                   let inputValue = createdElements.stepperInput.valueAsNumber;

                                   if(inputValue < 4 && stepper[1].classList.contains("forwardStepper")) {
                                        inputValue += 1

                                   } else if(inputValue > 1 && stepper[1].classList.contains("backwardStepper")) {
                                        inputValue -= 1;
     
                                   }

                                   createdElements.stepperInput.valueAsNumber = inputValue;
                                   changePage(inputValue, courseId);
                              })
                         })
                    }

                    function insertElements() {
                         createdElements.steppers.appendChild(createdElements.stepButtons.backwardStepper);
                         createdElements.steppers.appendChild(createdElements.stepperInput);
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
}




// aside
function obtainDataSelected() {
     if(callPurpose === "others") {
          return othersData

     } else {
          return coursesData
     }

}   




