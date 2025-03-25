import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./jsfirebase.js";
import { fetchOwnUserData } from "./jsuserdata.js"

const { usertype } = await fetchOwnUserData();

// redirect to the first page if there is no user
onAuthStateChanged(auth, (authData) => {
     analyzeLogState(authData);     

     if(usertype=== "admin") {
          showAdmContent();
     }
})



// // functions
// m level
function analyzeLogState(data) {
     preventUnlogUser()
     preventLogUser()


     function preventUnlogUser() {
          // user is not logged in, therefore he doesn't have acess to the site 
               if(data === null && !window.location.href.includes("index") && !window.location.href.includes("log") && window.location.href != "https://gleversonrafael.github.io/compiler/" ) {
               // GITHUB COMPATIBILITY
               if(window.location.href.includes("github")) {
                    window.location.href = "https://gleversonrafael.github.io/compiler/"

               } else {
                    window.location.href = "./../index.html";
               }
               
          }
     }


     function preventLogUser() {
          // user is logged in and tries to acess start page / login (GITHUB COMPATIBILITY)
          if(data != null && ( window.location.href.includes("index") || window.location.href == "https://gleversonrafael.github.io/compiler/" || window.location.href.includes("log"))) {
               if(window.location.href.includes("github")) {
                    window.location.href = "https://gleversonrafael.github.io/compiler/html/main.html"


               } else if(window.location.href.includes("log") && document.getElementById("passInp").value.length == 0 ){ /* suited for local server */
                    window.location.href = "./main.html"


               } else if(window.location.href.includes("index")) {
                    window.location.href = "./html/main.html"
               }
          
          }
     }
}


function showAdmContent() {
     // let admClasses = document.querySelectorAll(".limitedAcess");

     // admClasses.forEach((analyzedElement) => {
     //      analyzedElement.style.display = "flex";

     // })
}