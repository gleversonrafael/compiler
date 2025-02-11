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


onSnapshot(coursesCol, ()=> {
     pageType === "manageCourses" ? managerShowCourses() : showCourses();
});



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
     // var
     let courseId = obtainClickedCourseId();
     let courseBox = document.getElementById(courseId);

     changeCallPurposeViaOpenBox()

     

     let elementData = obtainDataSelected()[courseId];


     // process
     if(courseBox != null && (!courseBox.classList.contains("open"))) {
          showElements();
     }

     
     // compl    
     function obtainClickedCourseId() {
          let clickedElement = event.target;

          // div child clicked?
          if(clickedElement.childElementCount == 0) {
               return clickedElement.parentElement.id;
          
          } else {
               return clickedElement.id;
          }
     }

     
     function changeCallPurposeViaOpenBox() {
          let coursesAreaSelected = courseBox.parentElement.parentElement.id;
          console.log(coursesAreaSelected);

          if(coursesAreaSelected === "coursesA") {
               callPurpose = "my" 
          
          } else {
               callPurpose = "others"
          }
     }


     function showElements() {
          courseBox.classList.add("open");

          createElements()


          // aside
          function createElements() {
               // var
               let elements = {
                    divType: {
                         createdContent: document.createElement("div"),

                         emailDiv: document.createElement("div"),
                         emailDivChild: document.createElement("div"),

                         passwordDiv: document.createElement("div"),
                         passwordDivChild: document.createElement("div"),
                    },


                    pType: {
                         emailParagraph: document.createElement("p"),
                         emailValue: document.createElement("p"),

                         passwordParagraph: document.createElement("p"),
                         passwordValue: document.createElement("p")
                    },


                    others: {
                         userDataSubtitle: document.createElement("h3"),

                         acessAnchor: document.createElement("a"),
                         closeButton: document.createElement("button"),

                         emailCopy: document.createElement("button"),
                         passwordCopy: document.createElement("button")
                    }
               }


               setParagraphs()
               setOthers()
               allocateDivs()


               // compl
               function setParagraphs() {                    
                    elements.pType.emailParagraph.innerText = "E-mail";
                    elements.pType.passwordParagraph.innerText = "Senha";

                    elements.pType.emailValue.innerText = elementData.email;
                    elements.pType.passwordValue.innerText = elementData.userPassword;


                    // set classes
                    for(let p in elements.pType) {
                         if(p.includes("Paragraph")) {
                              elements.pType[p].classList.add("fieldName");
                         
                         } else {
                              elements.pType[p].classList.add("fieldValue");
                         }
                    }
               }


               function setOthers() {
                    elements.others.userDataSubtitle.innerText = "Dados";

                    elements.others.acessAnchor.innerText = "Acessar";
                    elements.others.closeButton.innerText = "Fechar";
                    elements.others.closeButton.onclick = closeBox;

                    elements.others.acessAnchor.setAttribute("href", elementData.url);
                    elements.others.acessAnchor.setAttribute("target", "_blank");


                    for(let copybutton in elements.others) {
                         if(copybutton.includes("Copy")) {
                              elements.others[copybutton].classList.add("copyButton");
                              elements.others[copybutton].onclick = copyData
                         }
                    }
               }

               
               function allocateDivs() {
                    allocateChildren();
                    allocateFathers();


                    function allocateChildren() {
                         // allocate child divs
                         for(let div in elements.divType) {
                              let attributeName;

                              // allocate child
                              if(div.includes("Child")) {
                                   // div name - DivChild
                                   attributeName = div.substring(0, div.length - 8);

                                   elements.divType[div].appendChild(elements.pType[`${attributeName}Paragraph`]);
                                   elements.divType[div].appendChild(elements.pType[`${attributeName}Value`]);
                              

                              // allocate content divs(email and password)
                              } else if(! div.includes("createdContent")) {
                                   // div name - Div
                                   attributeName = div.substring(0, div.length - 3);

                                   elements.divType[div].appendChild(elements.divType[`${attributeName}DivChild`]);
                                   elements.divType[div].appendChild(elements.others[`${attributeName}Copy`]);
                              }
                         }
                    }


                    function allocateFathers() {
                         // append pode não funcionar em outros navegadores.
                         elements.divType.createdContent.append(elements.others.userDataSubtitle, elements.divType.emailDiv, elements.divType.passwordDiv, elements.others.acessAnchor, elements.others.closeButton);

                         elements.divType.createdContent.classList.add("createdContent");
     
                         courseBox.appendChild(elements.divType.createdContent);

                    }
               }
          }
     }
}




function closeBox(ev) {
     let previouslyCreatedContent = ev.target.parentElement;
     let courseBox = previouslyCreatedContent.parentElement;
     
     courseBox.classList.remove("open");
     previouslyCreatedContent.remove();
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


