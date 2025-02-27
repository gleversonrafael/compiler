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

     console.log(analyzedData);


     for(let key = 0; key < analyzedData.length; key++) {
          let analyzedItem = Object.entries(analyzedData[key])[0];
          console.log(analyzedItem);


          console.log(analyzedItem[1]);
          console.log(validateData[analyzedItem[0]]);
          
          // [0] = name
          let regexTest = validateData[analyzedItem[0]].test(analyzedItem[1]);

          if(regexTest === false) {
               finalResult = false
               break
          }
     }

     return finalResult
}



// check password
async function checkPassword(passwordString) {
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


export { showMessageBox, userDataIsValid, checkPassword };