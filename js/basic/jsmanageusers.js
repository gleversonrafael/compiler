import { onSnapshot } from "firebase/firestore";
import { usersCol } from "./general/jsfirebase.js"


setManageUsersEvents();


function setManageUsersEvents() {
     // events go here
}


onSnapshot(usersCol, (snapshotEvent) => {
     fillTable("usersTable", snapshotEvent, "users");
});




async function fillTable(tableId, obtainedData, tableType) {
     const tableBody = document.querySelector(`${tableId} .tableBody`);
     let dataArray = await obtainDocumentsArray(obtainedData);


     for(let currentItem = 0; currentItem < dataArray.length; currentItem++) {
          let tableRow = document.createElement("tableRowCSS");
          tableRow.classList.add("tableRowCSS");

          if(tableType) {
               setCustomTableProperties(tableType, tableRow, dataArray[currentItem]);
          }

     }


     function setCustomTableProperties(tableType, thisRow, rowData) {
          if(tableType === "users") {
               const userObject = rowData[1];

               thisRow.classList.add(`${userObject.usertype}User`);
               thisRow.classList.add(userObject.active === true ? "activeUser" : "inactiveUser");

               // if delete add delete class --- fix
               // ----------------------------------

               createUsersCells()
          }



          function createUsersCells() {
               let createdElements = {
                    informationCell: document.createElement("td"),
                    usersActions: document.createElement("td"),

                    tableMainText: document.createElement("p"),
                    tableSubtext: document.createElement("p"),
                    tableEmphasisText: document.createElement("p"),

                    toggleUserInput: document.createElement("input"),
                    editUserInput: document.createElement("input"),
                    deleteUserInput: document.createElement("input"),
               }

               let createdElementsArray = Object.entries(createdElements);


               // set classes and shared aspects
               for(let element = 0; element < createdElementsArray.length; element++) {
                    let propertyName = createdElementsArray[element][0];
                    let thisElement = createdElements[propertyName];

                    if(propertyName.includes("text")) {
                         thisElement.classList.add("");


                    } else if(propertyName.includes("input")) {
                         thisElement.classList.add("");
                         thisElement.setAttribute("type", "input");

                    };

                    console.log(thisElement);
               }
          }
     }
}


// reusable
async function obtainDocumentsArray(snapshotData) {
     // array pattern -> [0] = id | [1] = data
     let returnedArray = [];

     snapshotData.forEach((data) => {
          let contentArray = [];
          
          contentArray[0] = data.id;
          contentArray[1] = data.data();

          returnedArray.push(contentArray);
     })


     return returnedArray
}