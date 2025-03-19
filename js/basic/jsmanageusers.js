import { initializeApp } from "firebase/app"
import { onSnapshot, setDoc, doc } from "firebase/firestore";
import { firebaseConfig, db, usersCol } from "./general/jsfirebase.js";
import { createUserWithEmailAndPassword, signOut, getAuth } from "firebase/auth"

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





// create
function setManageUsersEvents() {
     document.getElementById("createUserForm").addEventListener("submit", () => {
          createNewUser();
     })

     document.getElementById("openSignModal").addEventListener("click", () => {
          toggleModal("signUsersModal");
     })
     // events go here
}


async function createNewUser() {
     // user data creation
     const createdUserInputs = createUserInputs();
     const userDataArray = createUserDataArray("create", createdUserInputs);
     const userDataObject = convertSpecificArrayIntoObject(userDataArray);
     const userValidation = userDataIsValid(userDataArray);

     let messageType = "errorMessage";
     let message;


     if(userValidation) {
          const signUserAttempt = await signUser(userDataObject);

          if(signUserAttempt.result === true) {
               const newUserDatabaseUID = `u${signUserAttempt.returnedUID}`

               await setDoc(doc(db, "usersInfo", newUserDatabaseUID), userDataObject)
               .then(() => {
                    messageType = "successMessage";
                    message = "O usuário foi criado com sucesso!"

               })
               .catch((error) => {
                    messageType = "strangeMessage"
                    message = "O usuário foi cadastrado no firebase authenticate, mas não no banco de dados."
               
                    console.log(`ERROR: ${error.code}`);
               })
          

          } else {
               let selectedErrorMessage;

               switch(signUserAttempt.errorCode) {
                    case "auth/email-already-in-use": 
                         selectedErrorMessage = "Esse e-mail já está em uso!"
                         break

                    default:
                         selectedErrorMessage = "Um erro desconhecido no cadastramento de usuário ocorreu."
               }

               message = selectedErrorMessage;
          }       

     } else  { 
          message = ! userValidation ? "Preencha os dados do usuário corretamente!" : "Selecione o tipo de usuário!"
     } 


     showMessageBox(messageType, message)


     // complementary
     function createUserInputs() {
          let returnedInputs = [];

          // fill fillable inputs (string , telephone...)
          const fillableInputs =  document.querySelectorAll("#createUserForm .fillableInputJS");

          fillableInputs.forEach((selectedInput) => {
               if(selectedInput.classList.contains("requiredInputJS") || selectedInput.value) {
                    returnedInputs.push(selectedInput);
               }
          })


          // is user type filled
          let radioLabelInput = document.querySelector("#createUserForm .userTypeInput:checked");
     
          if(! radioLabelInput) {
               radioLabelInput = convertHtmlStringToElement(`<input type="radio" name="usertype" value="">`)
          }

          returnedInputs.push(radioLabelInput);
          

          return returnedInputs
     }


     async function signUser(userData) {    
          // creates a new instance that prevents current user from logging out
          const signApp = initializeApp(firebaseConfig, "signApp");
          const signAuth = getAuth(signApp);

          let signResult = {result: false, returnedUID: null, errorCode: null}


          await createUserWithEmailAndPassword(signAuth, userData.email, userData.password)
          .then((newUserCredential) => {
               signResult.returnedUID = `u${newUserCredential.user.uid}`;
               signResult.result = true;

          })
          .catch((errorMessage) => {
               signResult.errorCode = errorMessage.code
          })


          await signOut(signAuth);

          return signResult;
     }
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