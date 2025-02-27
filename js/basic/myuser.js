import { userData } from "./general/jsuserdata.js"


document.body.addEventListener("load", loadDefaults());

// load defaults
function loadDefaults() {
     fillFieldsWithUserData()
     toggleEvents();
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
               changeUserPassword();
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
function changeUserPassword() {
     if(currentPasswordIsCorrect()) {
          // setNewPassword()

     }


     function currentPasswordIsCorrect() {
          let passwordAssigned = document.getElementById("currentPasswordInput");

     }

}


// save user data
function saveUserDataProcess() {
     let userInputs = document.querySelectorAll("form#changeOwnUserData .fillableInputJS");
     let newUserData = createNewUserDataArray();
     let changesResult = thereWasChanges();

     console.log(newUserData);

     if(changesResult && userDataIsValid(newUserData)) {
          console.log("all true!");

     } else {
          console.log("something went wrong.");
     }


     function thereWasChanges() {
          let validateState = 0;

          for(let input = 0; input < userInputs.length; input++) {
               if(userInputs[input].name != "password" && userInputs[input].value != userInputs[input].placeholder) {
                    validateState = true;
                    break
               
               } else if(userInputs[input].name === "password") {


               }
          }


          return validateState
     }


     function createNewUserDataArray() {
          let newArray = [];
          
          userInputs.forEach((input) => {
               if(input.value.length > 0) {
                    let temporaryObject = {};

                    Object.defineProperty(temporaryObject, input.name, {
                         value: input.value,
                         enumerable: true,
                         writable: true,
                    })
     
                    newArray.push(temporaryObject);
               }
              
          }) 

          return newArray
     }
}


// reusable
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

          console.log(analyzedItem[1]);
          console.log(validateData[analyzedItem[0]]);
          
          // [0] = name
          let regexTest = validateData[analyzedItem[0]].test(analyzedItem[1]);
          
          console.log(regexTest);

          if(regexTest === false) {
               finalResult = false
               break
          }
     }

     return finalResult
}


