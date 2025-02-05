import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./fb.js"
import { userData } from "./userdata.js";


document.body.addEventListener("load", showUsername());


function showUsername() {
     let greetings = document.querySelector("#userGreetings");
     greetings.textContent = userData.name;
}















