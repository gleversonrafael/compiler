import { fetchOwnUserData } from "./general/jsuserdata.js"
import { setFunctionsOnLoad, removeSkeletons } from "./general/jsload.js"
import { setPageChangeEvents } from "./general/jspagechange.js"

await setHomeDefaults();
setFunctionsOnLoad([removeSkeletons]);
setPageChangeEvents();


async function setHomeDefaults() {
     let userData = await fetchOwnUserData();
     const greetedUserName = document.querySelector("#userGreetings");
     greetedUserName.innerText = userData.name;
}