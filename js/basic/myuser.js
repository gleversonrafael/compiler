import { userData } from "./general/jsuserdata.js"


// fill form fields with user data
document.body.addEventListener("load", fillFieldsWithUserData());


function fillFieldsWithUserData() {
     let userInputs = document.querySelectorAll("#changeOwnUserData .fillableInputJS");

     for(let input = 0; input < userInputs.length; input++) {
          let fieldSearched = userInputs[input].name

          if(userData[fieldSearched]) {
               userInputs[input].value = userData[fieldSearched];

               if(fieldSearched != "password") {
                    userInputs[input].placeholder = userData[fieldSearched];
               }

          }
     }
}




// save user data
document.getElementById("changeOwnUserData").addEventListener("submit", (submitEvent) => {
     submitEvent.preventDefault();

     saveUserDataProcess();
})



function saveUserDataProcess() {
     let userInputs = document.querySelectorAll("form#changeOwnUserData .fillableInputJS");
     let newUserData = createNewUserDataArray();

     console.log(newUserData);

     if(thereWasChanges() && userDataIsValid(newUserData)) {
          console.log("all true!");

     } else {
          console.log("something went wrong.");
     }


     function thereWasChanges() {
          let validateState = false;

          for(let input = 0; input < userInputs.length; input++) {
               let inputValue = userInputs[input].value;
               // not valid for password
               let inputOldValue = userInputs[input].placeholder;
               let inputName = userInputs[input].name


               // password
               if(inputName != "password" && inputValue != inputOldValue) {
                    validateState = true;
                    break
               }
          }


          return validateState
     }


     function createNewUserDataArray() {
          let newArray = [];
          
          userInputs.forEach((input) => {
               let temporaryObject = {};

               Object.defineProperty(temporaryObject, input.name, {
                    value: input.value,
                    enumerable: true,
                    writable: true,
               })

               newArray.push(temporaryObject);
          }) 

          return newArray
     }
}


function userDataIsValid(analyzedData) {
     let validateData = {
          name: /[\w]{2, }/,
          email: /[\w]{2,}@+[\w]{2,}.[\w]{2,}/ ,
          password: /.{4,}/,
          telephone: /[\d]{12}/
     }

     let finalResult = true;


     for(let key = 0; key < analyzedData.length; key++) {
          let analyzedItem = Object.entries(analyzedData[key])[0];
          // [0] = name

          console.log(analyzedItem[0]);
          console.log(analyzedItem[1]);

          let regexTest = validateData[analyzedItem[0]].test(analyzedItem[1]);

          if(regexTest === false) {
               finalResult = false
               break
          }
     }

     return finalResult
}


