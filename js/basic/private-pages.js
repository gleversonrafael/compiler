import { onAuthStateChanged } from "firebase/auth"
import { auth } from "fb.js"


// redirect to the first page if there is no user
onAuthStateChanged(auth, (userData) => {
     if(userData === null && !window.location.href.includes("index") && !window.location.href.includes("log")) {
          console.log("Retornado.")

     } else {
          console.log("Não foi retornado.")
     }

})