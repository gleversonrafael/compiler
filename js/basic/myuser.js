import bcrypt from "bcryptjs"

import { userData } from "./general/jsuserdata.js";
import { showMessageBox, userDataIsValid, checkUserPassword, toggleModal } from "./general/jsreusablestructures.js"

import { updateDoc, doc } from "firebase/firestore";
import { EmailAuthProvider, updatePassword, updateEmail, reauthenticateWithCredential, signOut } from "firebase/auth";
import { db, auth } from "./general/jsfirebase.js";



// global
let newAssignedPassword;
let oldPassword;

document.body.addEventListener("load", loadDefaults());


// load defaults
function loadDefaults() {
     fillFieldsWithUserData();
     toggleEvents();
     saveUserDataProcess("setEvents");
}


// toggle events
function toggleEvents() {
     generalEvents();
     specificEvents();
     cancelModalEvent();


     function generalEvents() {
          // forms
          let forms = document.querySelectorAll("form");

          forms.forEach((form) => {
               form.addEventListener("submit", (submitEvent) => {
                    submitEvent.preventDefault();
               });
          })
     };

     function specificEvents() {
          // change password
          document.getElementById("changePasswordButton").addEventListener("click", () => {
               toggleModal("changePasswordModal");
          });

          // save user data
          document.getElementById("changeOwnUserData").addEventListener("submit", () => {
               saveUserDataProcess();
          });

          // change password
          document.getElementById("changePassword").addEventListener("submit", () => {
               temporarilyChangeUserPassword();
          });


          // ""delete""" account
          document.getElementById("deleteAccount").addEventListener("click", () => {
               toggleModal("deleteOwnUserModal");
          })

          document.querySelector("form#deleteOwnUser").addEventListener("submit", () => {
               deleteOwnUser();
          })
     }


     function cancelModalEvent() {
          let cancelModalButtons = document.querySelectorAll(".cancelModalButton");

          cancelModalButtons.forEach((modalButton) => {
               modalButton.addEventListener("click", (clickEvent) => {
                    let canceledModalId = obtainFatherId(clickEvent.currentTarget, "modalPattern")
                    
                    if(canceledModalId === "noFather") {
                         canceledModalId = "notAModal"
                    }

                    toggleModal(canceledModalId);
               })
          })
     }
}


// obtain father id - reusable 
function obtainFatherId(clickedChild, fatherUniqueClass) {
     let selectedParent = clickedChild.parentElement;
     let errorResult;


     for(let fathersCounter = 0; fathersCounter < 6; fathersCounter ++) {
          // continue the loop while there is a father element without the class (max iterations: 6)
          if(selectedParent.tagName.length > 0 && ! selectedParent.classList.contains(fatherUniqueClass)) {
               selectedParent = selectedParent.parentElement;

          } else {
               errorResult = selectedParent.classList.contains(fatherUniqueClass) ? false : true
               break
          }

     }


     return errorResult === false ? selectedParent.id : "noFather"
}



// fill form fields with user data
function fillFieldsWithUserData() {
     let userInputs = document.querySelectorAll("#changeOwnUserData .fillableInputJS");

     for(let input = 0; input < userInputs.length; input++) {
          let fieldSearched = userInputs[input].name

          if(userData[fieldSearched]) {
               if(fieldSearched != "password") {
                    userInputs[input].placeholder = userData[fieldSearched];
                    userInputs[input].value = userData[fieldSearched];
               
               } else {
                    userInputs[input].placeholder = ""
               }              
          }
     }
}


// reusable

// change user password
async function temporarilyChangeUserPassword() {
     let oldPasswordAttempt = document.getElementById("changeCurrentPasswordInput").value;
     let newPassword = document.getElementById("newPasswordInput").value;
     let newPasswordObject = [{password: newPassword}];

     const checkUserPasswordResult = await checkUserPassword(oldPasswordAttempt);


     if(checkUserPasswordResult === true && userDataIsValid(newPasswordObject) === true) {
          let resetedForm = document.querySelector("form#changePassword");
          resetedForm.reset();

          oldPassword = oldPasswordAttempt;
          newAssignedPassword = newPassword;

          toggleModal("changePasswordModal")
          showMessageBox("strangeMessage", "Salve seus dados para completar a redefinição de senha.");


     } else if(checkUserPasswordResult === false) {
          showMessageBox("errorMessage", "Senha atual incorreta!");

     } else {
          showMessageBox("errorMessage", "A nova senha inserida não se adequa aos padrões de uso.");
     }
}




// save user data
async function saveUserDataProcess(callType, canBeSaved) {
     let userInputs;

     let newUserData;
     let newUserDataObject;
     let analyzeResult;


     if(callType === "setEvents") {
          setSaveEvents();

     } else {
          // array containing only the changed fields = [{name: test}, {test: test}]
          userInputs = document.querySelectorAll("form#changeOwnUserData .fillableInputJS");

          newUserData = createNewUserDataArray();
          newUserDataObject = convertSpecificArrayIntoObject(newUserData);
          analyzeResult = analyzeInputedData();

          
          if(analyzeResult.correct === true) {
               // confirm password modal
               if(canBeSaved != true && analyzeResult.type === "confidential" && ! newUserDataObject.password) {
                    toggleModal("confirmPasswordModal");
               
               } else if(canBeSaved != true) {
                    canBeSaved = true
               } 


               // save user data
               if(canBeSaved === true) {
                    saveOwnUserDataAttempt(analyzeResult.type, newUserDataObject);
               }
     

          } else {
               let errorString;
     
               switch(analyzeResult.type) {
                    case "noChange":
                         errorString = "Nenhum dado foi alterado."
                         break
     
                    case "incorrectData":
                         errorString = "Preencha corretamente seus dados!"
                         break
     
                    default:
                         errorString = "Um erro fora dos padrões foi encontrado"
               }
     
               showMessageBox("errorMessage", errorString);
          }     
     }




     // complementary functions
     function setSaveEvents() {
          // confirm password
          document.querySelector("form#confirmPassword").addEventListener("submit", async (submitEvent) => {
               submitEvent.preventDefault();

               if(await confirmUserPassword("confirmPassword") === true) {
                    oldPassword = document.getElementById("verifyPasswordInput").value;

                    toggleModal("confirmPasswordModal");
                    saveUserDataProcess("", true);
               };
          });
     }



     function analyzeInputedData() {
          // analyzeResult = {correct: false, type: wrongInformation}
          let analyzeResult = {correct: false , type: false};


          if(newUserData.length > 0 && userDataIsValid(newUserData)) {
               let typeOfResult;

               // confidential properties goes here
               if(newUserDataObject.email || newUserDataObject.password) {
                    typeOfResult = "confidential"

               } else {
                    typeOfResult = "safe"
               }


               Object.defineProperties(analyzeResult, {
                    correct: { value: true, writable: true },

                    type: {
                         value: typeOfResult,
                         writable: true 
                    }

               })


          } else {          
               // data didn't change
               Object.defineProperties(analyzeResult, {
                    correct: { value: false, writable: true },

                    type: {
                         value: newUserData.length === 0 ? "noChange" : "incorrectData",
                         writable: true,
                    }

               })
          } 

          return analyzeResult;
     }



     function createNewUserDataArray() {
          let newArray = [];
          
          userInputs.forEach((input) => {
               if(input.value != input.placeholder) {
                    let temporaryObject = {};

                    Object.defineProperty(temporaryObject, input.name, {
                         value: input.value,
                         enumerable: true,
                         writable: true,
                    })
     
                    newArray.push(temporaryObject);
               }
          }) 


          if(newAssignedPassword) {
               newArray.push({password: newAssignedPassword})
               newAssignedPassword = null;
          }
          
          return newArray
     }



     // async function confirmUserPassword() {
     //      let returnedValue = false;

     //      let analyzedValue = document.getElementById("verifyPasswordInput").value;
     //      let selectedFields = document.querySelectorAll("form#confirmPassword .confirmJS");
     //      selectedFields = Array.from(selectedFields);
     
     //      let confirmPasswordFields = confirmNFields(selectedFields, analyzedValue);
     
     
     //      // process
     //      if(confirmPasswordFields === true && await checkUserPassword(analyzedValue) === true) {
     //           returnedValue = true;

     //           toggleModal("confirmPasswordModal");
               
     //           oldPassword = analyzedValue;
               
     
     //      } else if(confirmPasswordFields === false) {
     //           showMessageBox("errorMessage", "As senhas informadas se contradizem.")
     
     //      } else {
     //           showMessageBox("errorMessage", "A senha informada não coincide com à do usuário")
     //      }


     //      return returnedValue;
     // }



     async function saveOwnUserDataAttempt(receivedDataType, receivedData) {
          const userDoc = doc(db, "usersInfo", `u${userData.uid}`);
          let userCredential;

          const currentUser = auth.currentUser;

          let validatedConfidentialFields = {};
          let validatedConfidentialFieldsValues;
          let validatedFieldState;
          


          // password / email on auth
          if(receivedDataType === "confidential") {
               userCredential = EmailAuthProvider.credential(userData.email, oldPassword);
               let credentialObtained;

               // main process
               await reauthenticateWithCredential(currentUser, userCredential)
               .then(() => { credentialObtained = true;})
               .catch((errorMessage) => {
                    credentialObtained = false
                    console.log(`Erro ao obter acesso para salvar e-mail e/ou senha. CÓD: ${errorMessage.code}`);
               })


               if(credentialObtained === true) {
                    if(receivedData.email) {
                         await updateEmailSetup();
                    }

                    if(receivedData.password) {
                         await updatePasswordSetup();
                    }

                    validatedConfidentialFieldsValues = Object.values(validatedConfidentialFields);
               }
          }


          // update user document in firestore
          if(receivedDataType === "safe" || confirmNFields(validatedConfidentialFieldsValues, true) === true) {
               updateDoc(userDoc, receivedData);
               showMessageBox("successMessage", "Dados atualizados!");
               setTimeout(() => {window.location.reload()}, 1000);
          }



          // complementary
          async function updateEmailSetup() {
               await updateEmail(currentUser, receivedData.email)
               .then(() => { validatedFieldState = true;})
               .catch((errorMessage) => {
                    console.log("ERRO: O e-mail do usuário não foi salvo. CÓD:" + errorMessage.code);
                    validatedFieldState = false;
               })


               Object.defineProperty(validatedConfidentialFields, "email", { 
                    value: validatedFieldState, enumerable: true 
               });     
          }


          async function updatePasswordSetup() {
               await updatePassword(currentUser, receivedData.password)
               .then(() => {
                    validatedFieldState = true;

                    Object.defineProperty(receivedData, "password", {
                         value: generatePasswordHash(receivedData.password),
                         enumerable: true
                    });

                    // oldPassword = null
                    // newAssignedPassword = null
                    // user is logged out...
               })
               .catch(() => {
                    console.log("ERRO: A senha do usuário não foi salva.");
                    validatedFieldState = false;
               });


               Object.defineProperty(validatedConfidentialFields, "password", {
                    value: validatedFieldState, enumerable: true
               });
          }


     }
}




// ""delete"" user
async function deleteOwnUser() {
     if(await confirmUserPassword("deleteOwnUser") === true) {
          console.log("deleted");
          let userDocument = doc(db, "usersInfo", `u${userData.uid}`);
          
          updateDoc(userDocument, { deleted: true })
          .then(() => {
               toggleModal("deleteOwnUser");        
               signOut();

          })

     };
}


// reusable
function generatePasswordHash(string) {
     let salt = bcrypt.genSaltSync(10);
     let hash = bcrypt.hashSync(string, salt);

     return hash
}


function convertSpecificArrayIntoObject(analyzedArray) {
     // array type = [{property: value}, {property: value}];
     let returnedObject = {};

     for(let item = 0; item < analyzedArray.length; item++) {
          let itemEntries = Object.entries(analyzedArray[item])[0];

          Object.defineProperty(returnedObject, itemEntries[0], {
               value: itemEntries[1],
               configurable: true,
               writable: true,
               enumerable: true
          })
     }
     
     return returnedObject
}


function confirmNFields(fieldsArray, wishedValue) {
     let confirmResult = true;

     for(let analyzedField = 0; analyzedField < fieldsArray.length; analyzedField++) {
          let fieldValue = fieldsArray[analyzedField].value != undefined ? fieldsArray[analyzedField].value : fieldsArray[analyzedField];
     
          if(fieldValue != wishedValue) {
               confirmResult = false;
               break
          } 
     }

     return confirmResult;
}




// confirm user both passwords 
async function confirmUserPassword(formId) {
     let returnedValue = false;

     // obtain the .firstPasswordJS value and compare it to all values with .confirmJS
     const analyzedValue = document.querySelector(`form#${formId} .firstPasswordJS`).value;
     let selectedFields = document.querySelectorAll(`form#${formId} .confirmJS`);
     selectedFields = Array.from(selectedFields);

     let confirmPasswordFields = confirmNFields(selectedFields, analyzedValue);
     
     
     if(confirmPasswordFields === true && await checkUserPassword(analyzedValue) === true) {
          returnedValue = true;

     } else if(confirmPasswordFields === false) {
          showMessageBox("errorMessage", "As senhas informadas se contradizem.")

     } else {
          showMessageBox("errorMessage", "A senha informada não coincide com à do usuário")
     }

     return returnedValue;
}


function removeElementsCertainClass(selectedElements, selectedClass) {
     selectedElements.forEach((element) => {
          element.classList.remove(selectedClass);

     })
}

