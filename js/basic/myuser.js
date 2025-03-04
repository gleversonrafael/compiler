import { userData } from "./general/jsuserdata.js";

import { updateDoc, doc } from "firebase/firestore";
import { EmailAuthProvider, updatePassword, updateEmail, reauthenticateWithCredential } from "firebase/auth";
import { db, auth } from "./general/jsfirebase.js";

import { showMessageBox, userDataIsValid, checkUserPassword } from "./general/jsreusablestructures.js"


import bcrypt from "bcryptjs"


// global
let newAssignedPassword;
let oldPassword;


document.body.addEventListener("load", loadDefaults());

// load defaults
function loadDefaults() {
     fillFieldsWithUserData()
     toggleEvents();
     saveUserDataProcess("setEvents");
}


// toggle events
function toggleEvents() {
     specificEvents();
     cancelModalEvent();


     function specificEvents() {
          // change password
          document.getElementById("changePasswordButton").addEventListener("click", () => {
               toggleModal("changePasswordModal");
          });

          // save user data
          document.getElementById("changeOwnUserData").addEventListener("submit", (submitEvent) => {
               submitEvent.preventDefault();
               saveUserDataProcess();
          });

          // change password
          document.getElementById("changePassword").addEventListener("submit", (submitEvent) => {
               submitEvent.preventDefault();
               temporarilyChangeUserPassword();
          });
     }


     function cancelModalEvent() {
          let cancelModalButtons = document.querySelectorAll(".cancelModalButton");

          cancelModalButtons.forEach((modalButton) => {
               modalButton.addEventListener("click", (clickEvent) => {
                    let canceledModalId = obtainFatherId(clickEvent.currentTarget, "modalMR")
                    
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


// open modals
// open modals can be converted to open element(advanced);
function toggleModal(selectedModalId) {
     if(selectedModalId != "notAModal") {
          let modalArea = document.getElementById("modalArea");
          let thisModal = document.getElementById(selectedModalId);

          if(thisModal.style.display != "flex") {
               modalArea.style.display = "flex";
               thisModal.style.display = "flex";

          } else {
               modalArea.style.display = "none";
               thisModal.style.display = "none";
          }
     
     } else {
          console.log("an attempt to toggle something that isn't a modal by using a modal button occurred.");
     }
}



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




// save user data + confirm user password
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
                         errorString = "Os novos dados não foram preenchidos corretamente."
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
          document.querySelector("form#confirmPassword").addEventListener("submit", (submitEvent) => {
               submitEvent.preventDefault();
               confirmUserPassword();
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



     async function confirmUserPassword() {
          let analyzedValue = document.getElementById("verifyPasswordInput").value;
          let selectedFields = document.querySelectorAll("form#confirmPassword .confirmJS");
          selectedFields = Array.from(selectedFields);
     
          let confirmPasswordFields = confirmNFields(selectedFields, analyzedValue);
     
     
          if(confirmPasswordFields === true && await checkUserPassword(analyzedValue) === true) {
               toggleModal("confirmPasswordModal");
               oldPassword = analyzedValue;
               saveUserDataProcess("", true);
     
          } else if(confirmPasswordFields === false) {
               showMessageBox("errorMessage", "As senhas informadas se contradizem.")
     
          } else {
               showMessageBox("errorMessage", "A senha informada não coincide com à do usuário")
          }
     }



     async function saveOwnUserDataAttempt(receivedDataType, receivedData) {
          let userDoc = doc(db, "usersInfo", `u${userData.uid}`);

          // password / email
          if(receivedDataType === "confidential") {
               let userCredential = EmailAuthProvider.credential(userData.email, oldPassword);
               let currentUser = auth.currentUser;


               await reauthenticateWithCredential(auth.currentUser, userCredential)
               .then(() => {
                    // update e-mail
                    updateEmail(currentUser, receivedData.email)
                    .then(() => {
                         console.log("email updated");
                    })

                    .catch((err) => {
                         console.log(err);
                         console.log("didn't update e-mail");

                    })


                    // update password
                    updatePassword(currentUser, receivedData.password)
                    .then(() => {
                         console.log("password updated");

                         Object.defineProperty(receivedData, "password", {
                              value: generatePasswordHash(receivedData.password),
                              enumerable: true
                         })
                    })

                    .catch(() => {
                         console.log("couldn't update the password")
                    });
               })

               .catch((errorMessage) => {
                    console.log("Erro na autenticação");
                    console.log(errorMessage);
               })
          }
          

          // adicionar on event listener - bug fix
          // fillFieldsWithUserData();

          updateDoc(userDoc, receivedData);
     }
}


document.getElementById("testButton").addEventListener("click", () => {
     let optedString = "123456";

     let generatedHash = generatePasswordHash(optedString);
     console.log(generatedHash);

})


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
          if(fieldsArray[analyzedField].value != wishedValue) {
               confirmResult = false;
               break
          } 
     }

     return confirmResult;
}


function removeElementsCertainClass(selectedElements, selectedClass) {
     selectedElements.forEach((element) => {
          element.classList.remove(selectedClass);

     })
}

