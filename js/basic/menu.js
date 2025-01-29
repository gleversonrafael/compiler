import { signOut } from "firebase/auth"
import { auth } from "./fb.js"


let signoutB = document.querySelector("button#signoutB");


signoutB.addEventListener("click", () => {
     signOut(auth);
})