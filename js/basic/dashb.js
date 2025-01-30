import { signOut } from "firebase/auth";
import { auth } from "./fb.js"


let signoutB = document.getElementById("signOUT");
let authdata = document.getElementById("authData");


signoutB.addEventListener("click", () => {
     console.log("SignOUTED")
     signOut(auth);
})


authdata.addEventListener("click", () => {
     console.log("AUTH DATA__--")
     console.log(auth);
})