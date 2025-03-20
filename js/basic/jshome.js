import { fetchOwnUserData } from "./general/jsuserdata.js"






async function setHomeDefaults() {
     let userData = await fetchOwnUserData();
     const greetedUserName = document.querySelector("#userGreetings");
     greetedUserName.innerText = userData.name;
}