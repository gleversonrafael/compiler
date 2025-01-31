import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./fb.js"

console.log(auth);
console.log(window.location.href);


// redirect to the first page if there is no user
onAuthStateChanged(auth, (userData) => {
     analyzeLogState(userData);
})




// // functions
function analyzeLogState(data) {
     // user is not logged in, therefore he doesn't have acess to the site 
     if(data === null && !window.location.href.includes("index") && !window.location.href.includes("log") && window.location.href != "https://gleversonrafael.github.io/compiler/" ) {
          // GITHUB COMPATIBILITY
          if(window.location.href.includes("github")) {
               window.location.href = "https://gleversonrafael.github.io/compiler/"

          } else {
               window.location.href = "./../index.html";
          }
          
     }


     // user is logged in and tries to acess start page / login (GITHUB COMPATIBILITY)
     // if(data != null && ( window.location.href.includes("index") || window.location.href == "https://gleversonrafael.github.io/compiler/" || window.location.href.includes("log"))) {
     //      if(window.location.href.includes("github")) {
     //           window.location.href = "https://gleversonrafael.github.io/compiler/html/dashboard.html"

     //      } else{
     //           // window.location.href = window.location.href.includes("login") ? "./html/dashboard.html" : "./dashboard.html"
     //           console.log("Redirecionado")
     //           console.log(data);
     //      }
     
     // }

     
     // if(data != null && window.location.href.includes("log")) {
     //      let passInp = document.getElementById("passInp");


     //      // is the password input filled? prevents user from being auto redirected afther finishing the form.
     //      if(passInp.value.length == 0) {
     //           window.location.href = "./dashboard.html"
     //      }

     // }  
}