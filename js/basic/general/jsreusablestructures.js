import { fetchOwnUserData, currentUserBasicInformation } from "./jsuserdata.js";
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
                    let canceledModalId = obtainFather(clickEvent.currentTarget, "modalJS").id;
                    
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
     let messageBox = document.querySelector(".messageBox"), closeButton;
     if(messageBox) messageBox.remove(); 
     
     messageBox = createMessageBox();
     defineCustomElements();
     setTimeout(() => removeMessageBox(messageBox), 1000);

     
     function createMessageBox() {
          const mainHeader = document.getElementById("mainHeader");
          const createdMessageBox = document.createElement("div");
          createdMessageBox.classList.add("messageBox", "bAll");

          closeButton = document.createElement("button");
          closeButton.classList.add("closeMessageBox");

          closeButton.addEventListener("click", () => removeMessageBox(createdMessageBox));

          createdMessageBox.appendChild(closeButton);
          mainHeader.appendChild(createdMessageBox);

          return createdMessageBox;
     }

     function removeMessageBox(selectedItem) {
          selectedItem.style.animation = "100ms hideMessageBoxANIM linear";
          selectedItem.style.animationFillMode = "forwards";

          setTimeout(() => selectedItem.remove(), 2500);
     }

     function defineCustomElements() {
          const messageParagraph = document.createElement("p");
          messageParagraph.innerText = message;

          messageBox.classList.add(messageType);
          messageBox.insertBefore(messageParagraph, closeButton);
     }
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
// FINISH ANIMATION
// FINISH
// FINISH
async function toggleModal(selectedModalId) {
     if(selectedModalId != "notAModal") {
          const modalArea = document.getElementById("modalArea"), 
               thisModal = document.getElementById(selectedModalId), 
               showItemAnimation = "0.1s showItemANIM linear forwards"
          ;

          thisModal.style.animation = showItemAnimation;
          modalArea.style.animation = showItemAnimation; 

          if(thisModal.style.display != "flex") {
               modalArea.style.display = "flex";
               thisModal.style.display = "flex";

          } else {
               await nullify();

               thisModal.style.animation += showItemAnimation + " reverse"
               modalArea.style.animation += showItemAnimation + " reverse"

               // console.log("reverse animation");

               await hide();

               async function nullify() {
                    setTimeout(() => {
                         // console.log("nullify animation");
                         thisModal.style.animation = "0s none none none";
                         modalArea.style.animation = "0s none none none";
          
                    }, 0)
               }
          
               async function hide() {
                    setTimeout(() => {
                         // console.log("hide");
                         modalArea.style.display = "none";
                         thisModal.style.display = "none";
          
                    }, 0)
               }

          }

          // console.log("final result");

          
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


function obtainArrayFromInputs(formId) {
     const fillableInputs =  document.querySelectorAll("#"+formId+" .fillableInputJS");
     let returnedInputs = [];

     fillableInputs.forEach((selectedInput) => {
          returnedInputs.push(selectedInput);
     })

     return returnedInputs
}


function fillSelectedForm(dataObject) {
     // dataObject = { selectedFormId, data: {field: example}}
     const dataArray = Object.entries(dataObject.data);

     for(let currentField = 0; currentField < dataArray.length; currentField++) {
          const fieldName = dataArray[currentField][0], 
          fieldValue = dataArray[currentField][1];

          const selectedHTMLInput = document.querySelector(
               `#${dataObject.selectedFormId} [data-relatedfield=${fieldName}]`
          );

          if(selectedHTMLInput) {
               selectedHTMLInput.value = fieldValue;
               selectedHTMLInput.placeholder = fieldValue;
          }
     }
}



// others
function convertHtmlStringToElement(htmlString) {
     let temporaryTemplate = document.createElement("template");
     htmlString = htmlString.trim();

     temporaryTemplate.innerHTML = htmlString

     return temporaryTemplate.content.firstElementChild;
}



////// user related
// check password
async function checkUserPassword(passwordString) {
     let userPassword = await obtainUserPassword();
     let compareTest = bcrypt.compareSync(passwordString, userPassword);

     
     return compareTest


     async function obtainUserPassword() {
          let thisUserUid = currentUserBasicInformation.uid;
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


// is user data valid
function userDataIsValid(analyzedData) {
     // analyzedData = Array with objects ({ name: test}, {other: test})
     const validateData = {
          name: /[\w]{2,}/,
          email: /[\w]{2,}@+[\w]{2,}.[\w]{2,}/,
          password: /.{4,12}/,
          telephone: /^$|[\d]{12,13}/,
          usertype: /regular|admin/,
     }

     let finalResult = true;

     for(let key = 0; key < analyzedData.length; key++) {
          // [0] = name | [1] = value
          const analyzedItem = Object.entries(analyzedData[key])[0];
          const selectedDataRegex = validateData[analyzedItem[0]];

          if(selectedDataRegex && selectedDataRegex.test(analyzedItem[1]) === false) {
               console.log("validation-break");

               finalResult = false
               break
          }
     }

     return finalResult
}


function obtainUserInputedData(selectedFormId) {
     let fillableInputs = obtainArrayFromInputs(selectedFormId);

     // is user type filled
     let userTypeInput = document.querySelector(`#${selectedFormId} .userTypeInput:checked`);


     if(! userTypeInput) {
          userTypeInput = convertHtmlStringToElement(`<input type="radio" name="usertype" value="null">`)
     } 

     fillableInputs.push(userTypeInput);

     return fillableInputs
} 

// create user data array
function createUserDataArray(operatingMode, selectedData, comparedData) {
     // console.log(selectedData);
     // console.log(comparedData);

     // selected data accepted == inputs array / node list with values and names
     let newArray = [];

     if(operatingMode === "create") {
          newArray.push({active: true}, {deleted: false});
     }

     selectedData.forEach((data) => {
          if(operatingMode === "create" || (operatingMode === "edit" && data.value != comparedData[data.name])) {
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

function generatePasswordHash(string) {
     let salt = bcrypt.genSaltSync(10);
     let hash = bcrypt.hashSync(string, salt);

     return hash
}



export { 
     setReusableEvents, convertHtmlStringToElement,
     obtainFather, fillSelectedForm,
     showMessageBox, 
     userDataIsValid, checkUserPassword, obtainUserInputedData,
     createUserDataArray, convertSpecificArrayIntoObject,
     forEachPropertyWithDo, obtainArrayFromInputs,
     toggleModal,
     customUpdateDocument, generatePasswordHash
};