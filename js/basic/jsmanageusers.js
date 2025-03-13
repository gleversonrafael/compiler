import { onSnapshot } from "firebase/firestore";
import { usersCol } from "./general/jsfirebase.js";
import { forEachPropertyWithDo, toggleModal } from "./general/jsreusablestructures.js"


setManageUsersEvents();


function setManageUsersEvents() {
     document.getElementById("openSignModal").addEventListener("click", () => {
          toggleModal("signUsersModal");
     })
     // events go here
}


onSnapshot(usersCol, (snapshotEvent) => {
     document.querySelector("#usersTable .tableBody").innerHTML = "";
     fillTable("usersTable", snapshotEvent, "users");
});


async function fillTable(tableId, obtainedData, tableType) {
     const tableBody = document.querySelector(`#${tableId} .tableBody`);
     let dataArray = await obtainDocumentsArray(obtainedData);


     for(let currentItem = 0; currentItem < dataArray.length; currentItem++) {
          let tableRow = document.createElement("tr");
          tableRow.classList.add("tableRowCSS");

          if(tableType) {
               setCustomTableComponents(tableType, tableRow, dataArray[currentItem]);
          }

          tableBody.appendChild(tableRow);
     }


     // complement
     function setCustomTableComponents(tableType, thisRow, rowData) {
          if(tableType === "users") {
               const userId = rowData[0];
               const userObject = rowData[1];

               const userTypeFix = userObject.usertype === "admin" ? "Administrador" : "Usuário comum";

               const textObject = {
                    MainText: userObject.name, 
                    Subtext: userObject.email,
                    EmphasisText: userTypeFix 
               }

               
               // this row classes and id
               thisRow.id = `userIdentifier${userId}`;

               thisRow.classList.add(
                    `${userObject.usertype}User`, 
                    userObject.active === true ? "activeUser" : "inactiveUser"
               )

               if(userObject.deleted === true) {
                    thisRow.classList.add("deleted");
               }


               // creating fields
               let userInfoCell = createTextCell(textObject, thisRow);
               let buttonsCell = createUsersActions();

               thisRow.appendChild(userInfoCell);
               thisRow.appendChild(buttonsCell);
          }


          // custom functions
          function createUsersActions() {
               let temporaryActionsCell = document.createElement("td");

               let createdButtonsClasses = ["toggleUserInput", "editUserInput", "deleteUserInput"];


               temporaryActionsCell.classList.add("userActionsCell");

               createdButtonsClasses.forEach((property) => {
                    if(! thisRow.classList.contains("deleted") || property.includes("deleteUserInput")) {
                         let temporaryButton = document.createElement("input");
                         temporaryButton.type = "button";
     
                         temporaryButton.classList.add(property, "squareButtonWithImage");
     
                         temporaryActionsCell.appendChild(temporaryButton);
                    }
               })



               return temporaryActionsCell
          };
     }


     // complementary
     function createTextCell(textObject) {            
          let textCell = document.createElement("td");
          textCell.classList.add("textCell");

          forEachPropertyWithDo({
               selectedObject: textObject,
               functionsArray: [createParagraph]
          });


          return textCell;


          // complementary
          function createParagraph(textClass, textValue) {
               let createdParagraph = `
               <p class="table${textClass} textOverflowCSS"> ${textValue} </p>`
               let elementParagraph = convertHtmlStringToElement(createdParagraph);
          
               textCell.appendChild(elementParagraph);
          }
     }
}


// reusable
function convertHtmlStringToElement(htmlString) {
     let temporaryTemplate = document.createElement("template");
     htmlString = htmlString.trim();

     temporaryTemplate.innerHTML = htmlString

     return temporaryTemplate.content.firstElementChild;
}



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