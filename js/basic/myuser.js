import bcrypt from "bcryptjs"

import { fetchOwnUserData, currentUserBasicInformation } from "./general/jsuserdata.js";
import { 
     setReusableEvents, showMessageBox, 
     userDataIsValid, checkUserPassword, 
     createUserDataArray, obtainArrayFromInputs, convertSpecificArrayIntoObject, 
     toggleModal,

} from "./general/jsreusablestructures.js"
import { removeSkeletons } from "./general/jsload.js"

import { updateDoc, doc } from "firebase/firestore";
import { EmailAuthProvider, updatePassword, updateEmail, reauthenticateWithCredential, signOut } from "firebase/auth";
import { db, auth } from "./general/jsfirebase.js";

// global
let newAssignedPassword = null;
let oldPassword;

document.body.addEventListener("load", await loadDefaults());


// load defaults
async function loadDefaults() {
     await fillFieldsWithUserData();
     toggleEvents();
     saveUserDataProcess("setEvents");
     removeSkeletons();
}


// toggle events
function toggleEvents() {
     setReusableEvents(["formsEvent", "cancelModalEvent"]);
     specificEvents();

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
}

// fill form fields with user data
async function fillFieldsWithUserData() {
     const { password, ...safeUserData } = await fetchOwnUserData();
     const userInputs = document.querySelectorAll("#changeOwnUserData .fillableInputJS");

     for(let input = 0; input < userInputs.length; input++) {
          let fieldSearched = userInputs[input].name

          if(safeUserData[fieldSearched]) {
               userInputs[input].placeholder = safeUserData[fieldSearched];
               userInputs[input].value = safeUserData[fieldSearched];
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
     let newUserData;
     let newUserDataObject;
     let analyzeResult;

     if(callType === "setEvents") {
          setSaveEvents();

     } else {
          const { password, ...currentUserData } =  await fetchOwnUserData();
          const userInputs = obtainArrayFromInputs("changeOwnUserData");

          // array containing only the changed fields = [{name: test}, {test: test}]
          newUserData = await createUserDataArray("edit", userInputs,currentUserData);

          if(newAssignedPassword != null) {
               newUserData.push({password: newAssignedPassword})
               newAssignedPassword = null;
          }

          
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
                         errorString = "Um erro fora dos padrões foi encontrado."
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
                    type: { value: typeOfResult, writable: true }
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

     async function confirmUserPassword() {
          let returnedValue = false;

          let analyzedValue = document.getElementById("verifyPasswordInput").value;
          let selectedFields = document.querySelectorAll("form#confirmPassword .confirmJS");
          selectedFields = Array.from(selectedFields);
     
          let confirmPasswordFields = confirmNFields(selectedFields, analyzedValue);
     
     
          // process
          if(confirmPasswordFields === true && await checkUserPassword(analyzedValue) === true) {
               toggleModal("confirmPasswordModal");

               oldPassword = analyzedValue;
               returnedValue = true;          
     
          } else if(confirmPasswordFields === false) {
               showMessageBox("errorMessage", "As senhas informadas se contradizem.")
     
          } else {
               showMessageBox("errorMessage", "A senha informada não coincide com à do usuário")
          }


          return returnedValue;
     }



     async function saveOwnUserDataAttempt(receivedDataType, receivedData) {
          const userDoc = doc(db, "usersInfo", currentUserBasicInformation.uid);

          const currentUser = auth.currentUser;
          let userCredential;

          let validatedConfidentialFields = {};
          let validatedConfidentialFieldsValues;
          let validatedFieldState;
          

          // password / email on auth
          if(receivedDataType === "confidential") {
               const {email} = await fetchOwnUserData();
               let credentialObtained;

               userCredential = EmailAuthProvider.credential(email, oldPassword);

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
               await updateDoc(userDoc, receivedData)
               .then(() => {window.location.reload()})
               .catch((errorMessage) => {
                    showMessageBox("Houve um erro na submissão dos dados");
                    console.log("database" + errorMessage.code);
               });
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
          let userDocument = doc(db, "usersInfo", `u${ currentUserBasicInformation.uid }`);
          
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

