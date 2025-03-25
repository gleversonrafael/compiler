import { fetchOwnUserData, currentUserUID } from "./jsuserdata.js";
import { usersCol } from "./jsfirebase.js"
import { getDocs, doc, updateDoc, query, where, limit } from "firebase/firestore"
import { db } from "./jsfirebase.js"

import bcrypt from "bcryptjs"





// reusable events
function setReusableEvents(eventsArray) {
     const functionsObject = {
          formsEventCall : formsEvent,
          cancelModalEventCall: cancelModalEvent,

     }

     eventsArray.forEach((selectedEvent) => {
          const executeFunction = functionsObject[`${selectedEvent}Call`];
          executeFunction();
     });


     // events
     function formsEvent() {
          // forms
          let forms = document.querySelectorAll("form");

          forms.forEach((form) => {
               form.addEventListener("submit", (submitEvent) => {
                    submitEvent.preventDefault();
               });
          })
     }


     function cancelModalEvent() { 
          let cancelModalButtons = document.querySelectorAll(".cancelModalButton");

          cancelModalButtons.forEach((modalButton) => {
               modalButton.addEventListener("click", (clickEvent) => {
                    let canceledModalId = obtainFather(clickEvent.currentTarget, "modalPattern").id;
                    
                    if(canceledModalId === "noFather") {
                         canceledModalId = "notAModal"
                    }

                    toggleModal(canceledModalId);
               })
          })
     }
}




// obtain father by unique class
function obtainFather(clickedChild, fatherUniqueClass) {
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

     return errorResult === false ? selectedParent : "noFather"
}




// show message box
function showMessageBox(messageType, message) {
     // success message / error message / strange message
     let messageBox = document.querySelector(".messageBox");
     let closeButton;

     if(messageBox) {
          messageBox.remove();
     }


     messageBox = createMessageBox();
     defineCustomElements();


     function createMessageBox() {
          const mainHeader = document.getElementById("mainHeader");

          const createdMessageBox = document.createElement("div");
          createdMessageBox.classList.add("messageBox", "bAll");

          closeButton = document.createElement("button");
          closeButton.classList.add("closeMessageBox");


          closeButton.addEventListener("click", () => {
               createdMessageBox.remove();
          });


          createdMessageBox.appendChild(closeButton);
          mainHeader.appendChild(createdMessageBox);


          return createdMessageBox;
     }


     function defineCustomElements() {
          let messageParagraph = document.createElement("p");
          messageParagraph.innerText = message;

          messageBox.classList.add(messageType);
          messageBox.insertBefore(messageParagraph, closeButton);
     }
}




// is user data valid
function userDataIsValid(analyzedData) {
     // analyzedData = Array with objects ({ name: test}, {other: test})
     let validateData = {
          name: /[\w]{2,}/,
          email: /[\w]{2,}@+[\w]{2,}.[\w]{2,}/ ,
          password: /.{4,12}/,
          telephone: /[\d]{12}/,
          usertype: /\w{1,}/
     }

     let finalResult = true;



     for(let key = 0; key < analyzedData.length; key++) {
          const analyzedItem = Object.entries(analyzedData[key])[0];
          const selectedDataType = validateData[analyzedItem[0]];
          let regexTest;

          if(selectedDataType) {
               regexTest = selectedDataType.test(analyzedItem[1]);
          }
          
          if(regexTest === false) {
               finalResult = false
               break
          }
     }

     return finalResult
}




// create user data array
async function createUserDataArray(operatingMode, selectedData) {
     // data accepted -> inputs with values and names
     let newArray = [];
     let editedUser;

     if(operatingMode === "create") {
          newArray.push({active: true}, {deleted: false});

     } else {
          let {password, safeUserData } = await fetchOwnUserData();
          editedUser = safeUserData;
     }


     selectedData.forEach((data) => {
          if(operatingMode === "create" || (operatingMode === "edit" && data.value != safeUserData[data.name])) {
               let temporaryObject = {};

               // data reference = input
               Object.defineProperty(temporaryObject, data.name, {
                    value: data.value,
                    enumerable: true,
                    writable: true,
               });

               newArray.push(temporaryObject);
          }
     })


     return newArray
}




// conversion
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


// check password
async function checkUserPassword(passwordString) {
     let userPassword = await obtainUserPassword();
     let compareTest = bcrypt.compareSync(passwordString, userPassword);

     
     return compareTest


     async function obtainUserPassword() {
          let thisUserUid = currentUserUID;
          let returnedPassword;
     
          await getDocs(query(usersCol, where("uid", "==", thisUserUid), limit(1)))
          .then((obtainedSnapshot) => {
               obtainedSnapshot.forEach((documentData) => {
                    const {password} = documentData.data();
                    returnedPassword = password

               })
          })


          return returnedPassword
     }
}


// for each property with, do
function forEachPropertyWithDo(parameterObject) {
     // parameterObject = {selectedObject, comparisonType, desiredValue, functionsArray}
     let properties = Object.entries(parameterObject.selectedObject);


     for(let selectedProperty = 0; selectedProperty < properties.length; selectedProperty++) {
          const propertyName = properties[selectedProperty][0];
          const propertyValue = properties[selectedProperty][1];

          let parameter;


          // generate comparison and set it on paramter
          if(parameterObject.comparisonType) {
               switch(parameterObject.comparisonType) {
                    case "equal": 
                         parameter = propertyValue === parameterObject.desiredValue ? true : false
                         break
                    
                    default:
               }
          
          } else {
               parameter = propertyValue ? true : false
          }


          // execute functions on parameter success
          if(parameter === true && parameterObject.functionsArray) {
               let functionsArray = parameterObject.functionsArray;

               for(let selectedFunction = 0; selectedFunction < functionsArray.length; selectedFunction++) {
                    // por padrão: passo o nome e o valor da propriedade
                    functionsArray[selectedFunction](propertyName, propertyValue);
               };
          
          }
     }
}


// toggle Modal 
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


// custom update document
async function customUpdateDocument(receivedData) {
     // received data object =
     // { selectedCollection, documentId, newData, desiredMessage, errorMessage }

     let updateObject = { result: false, returnedData: null }
     const selectedDocument = doc(db, receivedData.selectedCollection, receivedData.documentId);

     await updateDoc(selectedDocument, receivedData.newData)
     .then((newDocumentData) => {
          if(receivedData.desiredMessage) {
               showMessageBox("successMessage", receivedData.desiredMessage);        
          }

          updateObject.result = true;
          updateObject.returnedData = newDocumentData

     })
     .catch((error) => {
          showMessageBox("errorMessage",  receivedData.errorMessage);
          console.log("ERROR:"+ error.code);

          updateObject.returnedData = error.code

     })


     return updateObject
}



export { 
     setReusableEvents,
     obtainFather,
     showMessageBox, 
     userDataIsValid, checkUserPassword, 
     createUserDataArray, convertSpecificArrayIntoObject,
     forEachPropertyWithDo,
     toggleModal, 
     customUpdateDocument,
};