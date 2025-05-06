import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./jsfirebase.js";
import { doc, onSnapshot } from "firebase/firestore";
import { fetchOwnUserData, currentUserBasicInformation } from "./jsuserdata.js"

onAuthStateChanged(auth, async(authData) => {
     analyzeLogState(authData);
})

// inactive user/ deleted user
onSnapshot(doc(db, "usersInfo", currentUserBasicInformation.uid), async() => {
     const {deleted, active} = await fetchOwnUserData();
     if(deleted === true || active === false) signOut(auth);
});

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
     if(data === null && !window.location.href.includes("index")) window.location.href = "./../index.html";
     // prevent logged user from acessing login page
     if(data != null && ( window.location.href.includes("index"))) window.location.href = "./html/main.html?currentpage=home";
}

export { removeAdminElements }
