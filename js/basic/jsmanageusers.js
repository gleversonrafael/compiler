import { initializeApp } from "firebase/app"
import { onSnapshot, setDoc, doc, query, where } from "firebase/firestore";
import { firebaseConfig, db, usersCol } from "./general/jsfirebase.js";
import { createUserWithEmailAndPassword, signOut, getAuth } from "firebase/auth";

import { userData } from "./general/jsuserdata.js";

import { 
     setReusableEvents, forEachPropertyWithDo, 
     showMessageBox, toggleModal, customUpdateDocument,
     userDataIsValid, createUserDataArray, convertSpecificArrayIntoObject,
     obtainFather
     
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
     
     document.querySelector("#deleteUserModal .confirmFormJS").addEventListener("click", () => {
          deleteUserSubmit();
     })
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
                    message = "A autenticiadde do usuário foi cadastrada, sem um local definido no banco de dados."
               
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
          const userTypeInput = document.querySelector("#createUserForm .userTypeInput:checked");

          if(! userTypeInput) {
               userType = convertHtmlStringToElement(`<input type="radio" name="usertype" value="">`)
          } 

          returnedInputs.push(userTypeInput);
     

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


// delete
async function deleteUserSubmit() {
     const deleteUserModal = document.querySelector("#deleteUserModal");
     const deleteString  = /[delete]]/
     const userUID = deleteUserModal.dataset.selecteduseruid;

     const deleteUserProcess = await customUpdateDocument({
          documentId: userUID,
          selectedCollection: "usersInfo",
          newData: { deleted: true },
          desiredMessage: "O usuário foi excluído da plataforma!",
          errorMessage: "O usuário não foi excluído. Tente novamente."
     })


     if(deleteUserProcess.result === true) {
          toggleModal("deleteUserModal");
          deleteUserModal.removeAttribute("data-selecteduseruid");
     }
}


function showUserDeleteBox(userInformationObject) {
     // userInformationObject = { userName, userUID }

     const deleteUserModal = document.querySelector("#deleteUserModal");
     const selectedUserDisplayName = document.querySelector("#deleteUserModal .displayTextJS");

     deleteUserModal.setAttribute("data-selecteduseruid", userInformationObject.userUID);
     selectedUserDisplayName.innerText = userInformationObject.userName;

     toggleModal("deleteUserModal");
}



// table
onSnapshot(
     query(usersCol, where("id", "!=", userData.uid)), 

     (snapshotEvent) => {
          document.querySelector("#usersTable .tableBody").innerHTML = "";
          fillTable("usersTable", snapshotEvent, "users");
     }
);


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
               const userInfoCell = createTextCell(textObject, thisRow);
               thisRow.appendChild(userInfoCell);

               const buttonsCell = createUsersActions();
               thisRow.appendChild(buttonsCell);
          }


          // custom functions
          function createUsersActions() {
               let temporaryActionsCell = document.createElement("td");
               let createdButtonsClasses = ["toggleUserInput", "editUserInput", "deleteUserInput"];

               temporaryActionsCell.classList.add("userActionsCell");

               createdButtonsClasses.forEach((buttonClass) => {
                    const temporaryButton = createActionButton(thisRow, buttonClass);     
                    temporaryActionsCell.appendChild(temporaryButton);
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
                         const displayedUserName = thisRow.querySelector(".tableMainText").innerText;

                         // are you sure?
                         selectedAction = showUserDeleteBox;
                         actionParameters = { userName: displayedUserName, userUID: userUID}


                    } else if(buttonClass.includes("edit")) {
                         // selectedAction = toggleModal;
                         // actionParameters = "editUserModal"
                         selectedAction = showMessageBox;
                         actionParameters = "strangeMessage"
                    

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