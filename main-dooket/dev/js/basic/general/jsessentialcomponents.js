import { removeSkeletons } from "./general/jsload.js"

await initializeScripts();

async function initializeScripts() {
     if(document.readyState != "complete") {
         setTimeout(await initializeScripts(), 1000);

     } else {
          await setHomeDefaults();
          await removeSkeletons();
     }
}