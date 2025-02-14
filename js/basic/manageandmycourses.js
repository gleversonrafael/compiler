// other js
import { copyData } from "./mycourses.js"
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


// onSnapshot(coursesCol, ()=> {
//      pageType === "manageCourses" ? managerShowCourses() : showCourses();
// });



// functions
// main level
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


function openBox(event) {  
     let courseId
     let courseBox
     let elementData;
     
     if(pageType === "myCourses" || ! isInDeleteMode()) {
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




     // compl   
     function isInDeleteMode() {
          let temporaryCourses = document.querySelectorAll(".coursesColumn > .canBeDeleted, .coursesColumn > .willBeDeleted").length;

          if(temporaryCourses != 0) {
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
          let createdContent;
          let currentPageTitle = document.createElement("h3");
          let closeButton = document.createElement("button");
          let specialButton;

          courseBox.classList.add("open");

          // if(changePage) {


          // } else {
               createElements();
     
          // }

        


          // aside
          function createElements() {
               let elementProperties = [
                    { email: "E-mail" },

                    { url: "URL" }, 
                    { img: "URL" }
               ];


               if(pageType === "myCourses") {
                    elementProperties.splice(1, 0, { userPassword: "Senha"});
                    specialButton = document.createElement("a");
                    specialButton.href = elementData.url;
                    specialButton.target = "_blank";
                    specialButton.innerText = "Acessar";

                    createdContent = document.createElement("div");

               } else {
                    elementProperties.unshift(
                         { courseName: "Título"}, { coursePlatform: "Plataforma"}, { password: "Senha"} 
                    );

                    specialButton = document.createElement("input");
                    specialButton.type = "submit";
                    specialButton.innerText = "Confirmar";

                    createdContent = document.createElement("form");
               }


               createAndAllocatePages();

               createdContent.classList.add("createdContent");
               closeButton.classList.add("closeBoxButton");

               closeButton.innerText = "Fechar";
               closeButton.addEventListener("click", closeBox);

               createdContent.appendChild(closeButton);
               createdContent.appendChild(specialButton);

               courseBox.appendChild(createdContent);

               console.log(courseBox);



               // complementary
               function createAndAllocatePages() {
                    let temporaryCreatedPages = [];
                    let pageCounter = 0;


                    for(let elementCounter = 0; elementCounter < elementProperties.length; elementCounter++) {
                         // increment pages
                         if(elementCounter % 2 === 0) {
                              pageCounter += 1

                              let temporaryPage = document.createElement("div");

                              temporaryPage.classList.add(`coursePage${pageCounter}`);
                              temporaryCreatedPages.push(temporaryPage);

                              createdContent.appendChild(temporaryCreatedPages[temporaryCreatedPages.length - 1]);
                         }


                         let createdField = createASingleElement(elementProperties[elementCounter]);


                         // allocate pages
                         temporaryCreatedPages[temporaryCreatedPages.length - 1].appendChild(createdField);
                    }


                    temporaryCreatedPages[0].style.display = "flex";
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
                         temporaryValue.id =  propertyName + courseId
                         temporaryValue.value = elementData[propertyName];
                         temporaryValue.placeholder = elementData[propertyName];

                         if(propertyName != "courseName" && propertyName != "coursePlatform" && propertyName != "img") {
                              temporaryValue.type = propertyName;
                         
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
          }
     }
}






function closeBox(ev) {
     let previouslyCreatedContent = ev.currentTarget.parentElement;
     let courseBox = previouslyCreatedContent.parentElement;


     previouslyCreatedContent.remove();
     courseBox.classList.remove("open");
}




// secondary level
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
               if(Object.entries(obtainDataSelected()).length === 0) {
                    noData();     
               
               } else {
                    dataObtained();   
               }
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




// third level
function createCoursesBoxes() {
     let coursesColumns;

     if(callPurpose != "others") {
          coursesColumns = document.querySelectorAll("#coursesA > .coursesColumn");

     } else {
          coursesColumns = document.querySelectorAll("#othersA > .coursesColumn");
     }

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


function obtainDataSelected() {
     if(callPurpose === "others") {
          return othersData

     } else {
          return coursesData
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

