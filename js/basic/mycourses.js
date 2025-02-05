import { userData } from "./userdata.js"

import { onSnapshot, collection, where, query } from "firebase/firestore";
import { db } from "./fb.js";


// var
const coursesCol = collection(db, "courses");
let coursesData = {};


obtainAllowedCoursesData();
createCoursesBoxes("Teste", "Plataforma")


function showCourses() {
     if(obtainAllowedCoursesData() === true) {
          createCoursesBoxes();
     }

}


async function obtainAllowedCoursesData() {
     // var
     let mycoursesQuery = query(coursesCol, where("usersWithAcess", "array-contains", userData.uid));

     let insertData = new Promise((dataObtained, noData) => {
          onSnapshot(mycoursesQuery, (dataState) => {
               // add value to coursesData
               dataState.forEach((currentDocument)=> {
                    Object.defineProperty(coursesData, currentDocument.id, {
                         value: currentDocument.data()
     
                    })
     
               })


               // is there any data obtained?
               console.log(Object.entries(coursesData));
          

               if(Object.keys(coursesData).length === 0) {
                    noData("Array vazio!");     
               
               } else {
                    dataObtained("Array com elementos em seu interior!");
                    
               }
          })

     })



     // m process
     await insertData
     .then((msg) => {
          console.log(msg);
          console.log("Sucesso!");

          return true

     })
     .catch((msg) => {
          console.log(msg);
          console.log("There is no courses assigned.");

          return false
     })

}



function createCoursesBoxes(name, email) {
     console.log("Fired");
     let coursesA = document.getElementById("coursesA");
     console.log(coursesA);

     let div = document.createElement("div");
     let h1 = document.createElement("h1");
     h1.textContent = name

     let h2 = document.createElement("h2");     
     h2.textContent = email

     div.appendChild(h1);     
     div.appendChild(h2);

     console.log(div);


     coursesA.appendChild(div)
}