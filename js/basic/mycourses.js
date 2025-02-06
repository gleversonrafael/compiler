import { userData } from "./userdata.js"

import { onSnapshot, collection, where, query } from "firebase/firestore";
import { db } from "./fb.js";


// var
const coursesCol = collection(db, "courses");
let coursesData = {};
let searchButton = document.getElementById("searchButton");
let searchInp = document.getElementById("searchInp");




// events
// document.body.addEventListener("load", showCourses);
searchButton.addEventListener("click", () => {
     showCourses(searchInp.value);
});

searchInp.addEventListener("input", () => {
     showCourses(searchInp.value);
})




// functions
// main level
async function showCourses(searchedContent) {
     if(await obtainAllowedCoursesData(searchedContent) === true) {
          createCoursesBoxes();
     
     } else {
          let coursesA = document.getElementById("coursesA");

          coursesA.innerHTML = "";
          // noDataObtained();

     }

}


function openBox(event) {  
     let courseId = obtainClickedCourseId();
     let elementData = coursesData[courseId];
     
     openBox();



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


     function openBox() {
          let courseBox = document.getElementById(courseId);
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

                         passwordDiv: document.createElement("div")
                    },


                    pType: {
                         emailP: document.createElement("p"),
                         emailValue: document.createElement("p"),

                         passwordP: document.createElement("p"),
                         passwordValue: document.createElement("p")
                    },


                    others: {
                         userDataSubtitle: document.createElement("h3"),
                         acessAnchor: document.createElement("a"),

                         copyEmail: document.createElement("button"),
                         copyPassword: document.createElement("button")
                    }
               }



               // p
               elements.pType.emailP.innerText = "E-mail";
               elements.pType.emailValue.innerText = elementData[email];

               elements.pType.passwordP.innerText = "Senha";
               elements.pType.passwordValue.innerText = elementData[userPassword];

               // others
               elements.others.userDataSubtitle.innerText = "Dados";


               // divType 
               // elements.divType.createdContent.appendChild(elements.others.userDataSubtitle)
               // elements.divType.createdContent.appendChild

               // elements.divType.createdContent.append(elements.others.userDataSubtitle, elements.others)

               console.log(elements);

          }
     }
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
                    noData("No courses were found.");     
               
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
     .catch((msg) => {
          console.log(msg);
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
     let coursesArea =  document.querySelector("section#coursesA")
     coursesArea.innerHTML = "";


     Object.entries(coursesData).forEach((data) => {
          // var
          let courseId = data[0];
          let courseValues = data[1];


          let courseProperties = {
               courseBox: document.createElement("div"), 
               title: document.createElement("h1"),
               platform: document.createElement("h2")
          }



          // ids and event
          courseProperties.courseBox.id = courseId;
          courseProperties.courseBox.onclick = openBox;


          // set data
          courseProperties.title.innerText = courseValues.courseName;
          courseProperties.platform.innerText = `Plataforma:${courseValues.coursePlatform}`;


          // remover nomes e subtitulos no objeto posteriormente, para agilizar o programa

          // create elements
          courseProperties.courseBox.appendChild(courseProperties.title);
          courseProperties.courseBox.appendChild(courseProperties.platform);
          coursesArea.appendChild(courseProperties.courseBox);
     })

}