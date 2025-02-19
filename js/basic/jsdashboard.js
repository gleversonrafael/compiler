import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./general/jsfirebase.js"
import { userData } from "./general/jsuserdata.js";


document.body.addEventListener("load", showUsername());


function showUsername() {
     let greetings = document.querySelector("#userGreetings");
     greetings.textContent = userData.name;
}















