import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./fb.js"


// redirect to the first page if there is no user
onAuthStateChanged(auth, (userData) => {
     analyzeLogState(userData);
})




// // functions
function analyzeLogState(data) {
     // user is not logged in, therefore he doesn't have acess to the site 
     if(data === null && !window.location.href.includes("index") && !window.location.href.includes("log") && !window.location.href.includes("compiler")) {
          // GITHUB COMPATIBILITY
          if(window.location.href.includes("github")) {
               window.location.href = "https://gleversonrafael.github.io/compiler/"

          } else {
               window.location.href = "./../index.html";
          }
          
     }


     // user is logged in and tries to acess start page / login (GITHUB COMPATIBILITY)
     if(data != null && (window.location.href.includes("index") || window.location.href.includes("compiler"))) {
          window.location.href = "./html/dashboard.html";  
     }

     
     if(data != null && window.location.href.includes("log")) {
          let passInp = document.getElementById("passInp");

          // is the password input filled? prevents user from being auto redirected afther finishing the form.
          if(passInp.value.length == 0) {
               window.location.href = "./dashboard.html"
          }

     }  
}