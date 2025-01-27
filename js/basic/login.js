// firebase
import { getDoc } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"


// vanilla js
import { firebaseConfig } from "./fb.js";
import { db } from "./fb.js";
import { app } from "./fb.js";




// global var
const mForm = document.getElementById("mForm");
const auth = getAuth();




// events
// mForm.addEventListener("submit", loginP(tEvent));
mForm.addEventListener("submit", loginP)



// // functions
function loginP(sEvent) {
    sEvent.preventDefault();

    const emailD = mForm.email.value;
    const passD = mForm.passw.value ;

    signInWithEmailAndPassword(auth, emailD, passD)
      .then(() => {
        console.log("")

      })
      
      .catch((err) => {
        console.log(err)

      });
}

