import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./jsfirebase.js";
import { fetchOwnUserData } from "./jsuserdata.js"

onAuthStateChanged(auth, (authData) => {
     analyzeLogState(authData);     
})

const { usertype } = await fetchOwnUserData();
if(usertype !== "admin") {removeAdminElements();}

function removeAdminElements(selectedElements) {
     if(!selectedElements) selectedElements = document.querySelectorAll(".adminAcessJS");
     if(selectedElements) {
          selectedElements.forEach((element) => element.remove())
     }  
}
function analyzeLogState(data) {
     // prevent unlogged user from acessing the site
     if(data === null && !window.location.href.includes("login")) window.location.href = "./../login.html";
     // prevent logged user from acessing login page
     if(data != null && ( window.location.href.includes("index") && document.getElementById("passInp").value.length === 0)) window.location.href = "./html/main.html";
}

export { removeAdminElements }
