import { userData } from "./userdata.js"

import { onSnapshot, collection, where, query } from "firebase/firestore";
import { db } from "./fb.js";


// var
const coursesCol = collection(db, "courses");
let coursesData = {};
let searchButton = document.getElementById("searchButton");
let searchInp = document.getElementById("searchInp");




// events
searchButton.addEventListener("click", () => {
     showCourses(searchInp.value);
});

searchInp.addEventListener("input", () => {
     showCourses(searchInp.value);
})

onSnapshot(coursesCol, ()=> {
     showCourses();
});



// functions
// main level
async function showCourses(searchedContent) {
     if(await obtainAllowedCoursesData(searchedContent) === true) {
          createCoursesBoxes();
     
     } else {
          let coursesColumns = document.querySelectorAll(".coursesColumn");
          
          coursesColumns.forEach((column) => {
               column.innerHTML = "";

          });
     }
}




function openBox(event) {  
     let courseId = obtainClickedCourseId();
     let elementData = coursesData[courseId];
     let courseBox = document.getElementById(courseId);

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

                    elements.others.acessAnchor.setAttribute("href", coursesData[courseId].url);
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




function copyData(ev) {
     let inputBox = ev.target.parentElement;
     let inputValue = inputBox.children[0].children[1].innerText;

     // exec command obsolete
     navigator.clipboard.writeText(inputValue);
}





// secondary level
async function obtainAllowedCoursesData(searchedContent) {
     // query process
     let mycoursesQuery = createQuery();


     let insertData = new Promise((dataObtained, noData) => {
          onSnapshot(mycoursesQuery, (dataState) => {
               // add value to coursesData
               dataState.forEach((currentDocument)=> {
                    Object.defineProperty(coursesData, currentDocument.id, {
                         value: currentDocument.data(),
                         writable: true,
                         configurable: true,
                         enumerable: true
     
                    })
               })


               // is there any data obtained?
               if(Object.entries(coursesData).length === 0) {
                    noData();     
               
               } else {
                    dataObtained();   
               }
          })

     })



     // process
     let insertDataResult;
     coursesData = {};


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


          if(searchedContent === undefined || searchedContent === "") {
               queryResult = query(coursesCol, where("usersWithAcess", "array-contains", userData.uid));
          
          } else {
               queryResult = query(coursesCol, where("usersWithAcess", "array-contains", userData.uid), where("courseName", "==",  searchedContent));  

          }

          return queryResult
     }


}




// third level
function createCoursesBoxes() {
     let coursesColumns = document.querySelectorAll("div.coursesColumn");
     coursesColumns.forEach((column) => {
          column.innerHTML = "";
     })


     Object.entries(coursesData).forEach((data) => {
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


