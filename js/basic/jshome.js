import { fetchOwnUserData } from "./general/jsuserdata.js"
import { setFunctionsOnLoad, removeSkeletons } from "./general/jsload.js"

await setHomeDefaults();
setFunctionsOnLoad([removeSkeletons]);


async function setHomeDefaults() {
     let userData = await fetchOwnUserData();
     const greetedUserName = document.querySelector("#userGreetings");
     greetedUserName.innerText = userData.name;
}