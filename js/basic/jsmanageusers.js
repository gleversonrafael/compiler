import { initializeApp } from "firebase/app"
import { getDoc, getDocs, setDoc, updateDoc, doc, query, where, onSnapshot } from "firebase/firestore";
import { firebaseConfig, db, usersCol } from "./general/jsfirebase.js";
import { createUserWithEmailAndPassword, signOut, getAuth } from "firebase/auth";

import { currentUserBasicInformation } from "./general/jsuserdata.js";
import { setFunctionsOnLoad, removeSkeletons } from "./general/jsload.js" 

import { 
     setReusableEvents, convertHtmlStringToElement,
     showMessageBox, toggleModal, customUpdateDocument,
     userDataIsValid, obtainUserInputedData, createUserDataArray,
     convertSpecificArrayIntoObject, obtainFather,
     fillSelectedForm, forEachPropertyWithDo

} from "./general/jsreusablestructures.js"


// events
setManageUsersEvents();
setReusableEvents([
     "formsEvent", "cancelModalEvent"
]);


// asyncronous
await refreshTableWithNewData();
setFunctionsOnLoad([removeSkeletons]);


// always
onSnapshot(usersCol, async() => {
     await refreshTableWithNewData();
});


async function refreshTableWithNewData(receivedData) {
     let usersArray;
     
     if(! receivedData) {
          receivedData = await obtainUsers();  
     }

     if(receivedData !== "ERROR") {
          usersArray = obtainDocumentsArray(receivedData);
          fillTable("usersTable", usersArray, "users");
     
          return true;

     } else {
          return false;
     }


     async function obtainUsers() {
          const searchUserQuery = query(usersCol, where("uid", "!=", currentUserBasicInformation.uid), where("deleted", "==", false));
          let response;

          await getDocs(searchUserQuery)
          .then((receivedUsers) => {
               response = receivedUsers;
          })
          .catch((error) => {
               showMessageBox("errorMessage", "Não foi possível recarregar a tabela.");
               console.log(error.code);
               response = "ERROR"
          })

          return response
     }
}


// table
async function fillTable(tableId, dataArray, tableType) {
     const tableBody = document.querySelector(`#${tableId} .tableBody`);
     tableBody.innerHTML = ""

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
                         const {password, ...userData} = rowData[1];

                         selectedAction = showAndRestartEditUserBox;                         
                         actionParameters = { userUID: userUID, userData: userData };
                    

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


// create
function setManageUsersEvents() {
     const createUserForm = document.getElementById("createUserForm");

     createUserForm.addEventListener("submit", () => {
          createNewUser(createUserForm);
     })

     document.getElementById("openSignModal").addEventListener("click", () => {
          toggleModal("signUsersModal");
     })
     
     document.querySelector("#deleteUserModal .confirmFormJS").addEventListener("click", () => {
          deleteUserSubmit();
     })


     document.querySelector("#editUserForm").addEventListener("submit", () => {
          const editUserForm = document.querySelector("#editUserForm");
     
          submitUserSaveData(
               {
                    selectedForm: "editUserForm", oldDataDocumentId: editUserForm.dataset.selecteduseruid, obtainDataTries: 0
               }, 
          );
     })
}


async function createNewUser(createForm) {
     // user data creation
     const createdUserInputs = obtainUserInputedData("createUserForm");
     const userDataArray = await createUserDataArray("create", createdUserInputs);
     const userDataObject = convertSpecificArrayIntoObject(userDataArray);
     const userValidation = userDataIsValid(userDataArray);

     let messageType = "errorMessage";
     let message;
     let creationSucess;

     await validateAndCreateUser();
     showMessageBox(messageType, message);

     if(creationSucess === true) {
          createForm.reset();
     }


     // complementary
     async function validateAndCreateUser() {
          if(userValidation) {
               const signUserAttempt = await signUser(userDataObject);
     
               if(signUserAttempt.result === true) {
                    const newUserDatabaseUID = `u${signUserAttempt.returnedUID}`
     
                    Object.defineProperty(userDataObject, "uid", {
                         value: newUserDatabaseUID, enumerable: true}
                    );
     
                    await addUserToDatabase(newUserDatabaseUID, userDataObject)
                    .then((response) => {creationSucess = response}); 
     
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
     }


     async function signUser(userData) {    
          // creates a new instance that prevents current user from logging out
          const signApp = initializeApp(firebaseConfig, "signApp");
          const signAuth = getAuth(signApp);

          let signResult = {result: false, returnedUID: null, errorCode: null}


          await createUserWithEmailAndPassword(signAuth, userData.email, userData.password)
          .then((newUserCredential) => {
               signResult.returnedUID = newUserCredential.user.uid;
               signResult.result = true;

          })
          .catch((errorMessage) => {
               signResult.errorCode = errorMessage.code
          })


          await signOut(signAuth);

          return signResult;
     }
     

     async function addUserToDatabase(userUID, userData,) {
          let response;

          // save data into database
          await setDoc(doc(db, "usersInfo", userUID), userData)
          .then(() => {
               messageType = "successMessage";
               message = "O usuário foi criado com sucesso!"

               response = true;
          })
          .catch((error) => {
               messageType = "strangeMessage"
               message = "A autenticiadde do usuário foi cadastrada, sem um local definido no banco de dados."
               console.log(`ERROR: ${error.code}`);

               response = false;
          })

          return response
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



// edit
// can be adapted to submit data
async function submitUserSaveData(submitedDataObject) {
     // console.log("DATAOBJECT:");
     // console.log(submitedDataObject);
     // submitedDataObject = { selectedForm, oldDataDocumentId, obtainDataTries }
     let newData, message, messageType, selectedModal, dataUpdateResult = false;

     const userDocumentId = submitedDataObject.oldDataDocumentId, 
          userDocument = doc(db, "usersInfo", userDocumentId)
     ;

     let oldData = await getDoc(userDocument);


     if(oldData.exists()) {
          oldData = oldData.data();
          newData = obtainNewData();
          const newDataArray = Object.entries(newData);

          if(newDataArray.length > 0 && userDataIsValid(newData)) {
               await submitUserData();
               
               if(dataUpdateResult === true) { await refreshTableWithNewData(); }     
               toggleModal(selectedModal.id);
          
          } else {
               messageType = "errorMessage"
               message = newDataArray.length === 0 ? "Altere os dados desse usuário para salvar as alterações!" : "Preencha corretamente os dados do usuário!"
          }

          showMessageBox(messageType, message);

     } else {
          submitedDataObject.obtainDataTries += 1;
          submitedDataObject.obtainDataTries < 3 ? submitUserSaveData(submitedDataObject) : showMessageBox("errorMessage", "Não foi possível obter os dados anteriores desse usuário e, portanto, atualizá-lo no momento.");

          console.log("dataRequestFailure"+submitedDataObject.obtainDataTries);
     }



     function obtainNewData() {
          let returnedData = obtainUserInputedData(submitedDataObject.selectedForm);
          returnedData = createUserDataArray("edit", returnedData, oldData);
          returnedData = convertSpecificArrayIntoObject(returnedData);

          // OS RADIO BUTTONS NÃO SÃO CONSIDERADOS NO OLD DATA?

          return returnedData
     }

     async function submitUserData() {
          await updateDoc(userDocument, newData)
          .then(() => {
               dataUpdateResult = true;
               message = "Usuário alterado!";
               selectedModal = obtainFather(document.getElementById(submitedDataObject.selectedForm), "modalJS");
          })
          .catch((error) => {
               message = "Não foi possível salvar os dados do usuário.";
               console.log(`ERROR${error.code}`);
          });

          messageType = dataUpdateResult === true ? "successMessage" : "errorMessage";
     }
}

function showAndRestartEditUserBox(receivedDataObject) {
     // receivedDataObject = { userUID, userData }
     const editUserForm = document.querySelector(`form#editUserForm`),
          userTypeRadio =  document.querySelector(`input[data-relatedfield=usertype-${receivedDataObject.userData.usertype}]`),
          resetButton = document.querySelector("form#editUserForm .formResetJS"),
          
          restartDataPack = { formId: "editUserForm", newData: receivedDataObject.userData, radiosToFill: [userTypeRadio]}
     ;


     editUserForm.dataset.selecteduseruid = receivedDataObject.userUID;

     resetButton.onclick = function resetEditForm(resetEvent) {
          resetEvent.preventDefault();
          restartForm(restartDataPack);
     }

     restartForm(restartDataPack);
     toggleModal("editUserModal");

}

function restartForm(formInformation) {
     // formInfo = {formId, newData, radiosToFill}
     fillSelectedForm(
          {selectedFormId: formInformation.formId, data: formInformation.newData}
     );

     for(let selectedRadio = 0; selectedRadio < formInformation.radiosToFill.length; selectedRadio++) {
          formInformation.radiosToFill[selectedRadio].checked = true; 
     }
}

function obtainDocumentsArray(snapshotData) {
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