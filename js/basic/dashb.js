import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./fb.js"
import { userData } from "./userdata.js";


document.body.addEventListener("load", showUsername());


function showUsername() {
     let greetings = document.querySelector("#userGreetings");
     greetings.textContent = userData.name;
}




























// --------------------------------------
// aside
let signoutB = document.getElementById("signOUT");
let authdata = document.getElementById("authData");

signoutB.addEventListener("click", () => {
     console.log("SignOUTED")

     signOut(auth);
})


authdata.addEventListener("click", () => {
     onAuthStateChanged(auth, (userData) => {
          console.log(userData);
          console.log("AUTH::");
          console.log(auth);
     })
     
})