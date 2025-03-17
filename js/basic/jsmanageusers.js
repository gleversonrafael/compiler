import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { firebaseConfig, db, usersCol } from "./general/jsfirebase.js";
import { 
     setReusableEvents,  forEachPropertyWithDo, 
     showMessageBox, toggleModal, 
     userDataIsValid, createUserDataArray, convertSpecificArrayIntoObject
     
} from "./general/jsreusablestructures.js"


// events
setManageUsersEvents();
setReusableEvents([
     "formsEvent", "cancelModalEvent"
]);




function setManageUsersEvents() {
     document.getElementById("createUserForm").addEventListener("submit", () => {
          createNewUser();
     })

     document.getElementById("openSignModal").addEventListener("click", () => {
          toggleModal("signUsersModal");
     })

     document.querySelector("#deleteUserModal .confirmFormJS").addEventListener("click", () => {
          deleteUserSubmit();
     })
}

// create
async function createNewUser() {
     const createUserInputs = document.querySelectorAll("#createUserForm .fillableInputJS");
     
     const userDataArray = createUserDataArray("create", createUserInputs);
     const userDataObject = convertSpecificArrayIntoObject(userDataArray);

     const userValidation = userDataIsValid(userDataArray);
     const radioLabelValue = document.querySelector("#createUserForm .radioLabel:has(+ input:checked)");

     let messageType;
     let message;


     if(userValidation && radioLabelValue) {
          await signUser(userDataObject);
          messageType = "successMessage";
          message = "Dados salvos!"

     } else  { 
          messageType = "errorMessage";

          message = ! userValidation ? "Preencha os dados do usuário corretamente!" : "Preencha o tipo de usuário!"
          
     } 

     showMessageBox(messageType, message)



     async function signUser(userDataObject) {
          console.log(userDataObject);
     }
}


// delete
function deleteUserSubmit() {
     const userUID = document.querySelector("#deleteUserModal").name;

     customUpdateDocument({
          documentId: userUID,
          selectedCollection: "usersInfo",
          newData: { deleted: true },
          desiredMessage: "O usuário foi excluído da plataforma!",
          errorMessage: "O usuário não foi excluído. Tente novamente."
     });
}


function showDeleteBox(username) {
     const deleteUserModal = document.querySelector("#deleteUserModal");

     deleteUserModal.setAttribute("name", `delete${userUID}`);
     const selectedUserDisplayName = document.querySelector("#deleteUserModal .displayTextJS");

     selectedUserDisplayName.innerText = ""
     toggleModal("deleteUserModal");

}

// CHANGES
// ------------------------------
// ------------------------------
// ------------------------------
// ------------------------------



// reutilizável
async function customUpdateDocument(receivedData) {
     // received data object =
     // { selectedCollection, documentId, newData, desiredMessage, errorMessage }
     
     const selectedUserDocument = doc(db, receivedData.selectedCollection, receivedData.documentId);

     await updateDoc(selectedUserDocument, receivedData.newData)
     .then(() => {
          if(receivedData.desiredMessage) {
               showMessageBox("successMessage", receivedData.desiredMessage);        
          }

     })
     .catch((error) => {
          showMessageBox("errorMessage",  receivedData.errorMessage);
          console.log("ERROR:"+ error.code);
     })
}








// table
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
                    // insert only delete on deleted state user 
                    if(! thisRow.classList.contains("deleted") || property.includes("deleteUserInput")) {
                         const temporaryButton = createActionButton(thisRow, property);     
                         temporaryActionsCell.appendChild(temporaryButton);

                    }

               })


               return temporaryActionsCell

               
               function createActionButton(thisRow, buttonClass) {
                    const removedIdText = /userIdentifier/
                    const userUID = thisRow.id.replace(removedIdText, "");
                    
                    let temporaryButton = document.createElement("input");
                    let selectedAction;
                    let actionParameters;

                    temporaryButton.type = "button";
                    temporaryButton.classList.add(buttonClass, "squareButtonWithImage");

                    
                    if(buttonClass.includes("delete")) {
                         // are you sure?
                         selectedAction = showDeleteBox;
                         actionParameters = (userUID, );


                    } else if(buttonClass.includes("edit")) {
                         selectedAction = toggleModal;
                         actionParameters = "editUserModal"


                    // toggle
                    } else {
                         const newActiveState = thisRow.classList.contains("activeUser") ? false: true; 
                         const unocurredActiveState = newActiveState === true ? false : true

                         selectedAction = customUpdateDocument;
                         actionParameters = { 
                              selectedCollection: "usersInfo",
                              documentId: userUID,
                              newData: { active: newActiveState },
                              errorMessage: `O usuário selecionado previamente não foi ${unocurredActiveState}`,
                         }
                    }



                    temporaryButton.addEventListener("click", () => {
                         selectedAction(actionParameters);
                    });


                    return temporaryButton;

               }
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