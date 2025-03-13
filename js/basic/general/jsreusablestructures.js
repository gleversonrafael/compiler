import { userData } from "./jsuserdata.js";
import { usersCol } from "./jsfirebase.js"
import { getDocs, query, where, limit } from "firebase/firestore"
import bcrypt from "bcryptjs"


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
          telephone: /[\d]{12}/
     }

     let finalResult = true;



     for(let key = 0; key < analyzedData.length; key++) {
          let analyzedItem = Object.entries(analyzedData[key])[0];
          // [0] = name
          // [1] = value

          let regexTest = validateData[analyzedItem[0]].test(analyzedItem[1]);

          if(regexTest === false) {
               finalResult = false
               break
          }
     }

     return finalResult
}



// check password
async function checkUserPassword(passwordString) {
     let userPassword = await obtainUserPassword();
     let compareTest = bcrypt.compareSync(passwordString, userPassword);

     
     return compareTest


     async function obtainUserPassword() {
          let thisUserUid = userData.uid;
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


export { 
     showMessageBox, 
     userDataIsValid, checkUserPassword, 
     forEachPropertyWithDo,
     toggleModal
};