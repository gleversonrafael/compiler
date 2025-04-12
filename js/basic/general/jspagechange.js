import { forEachPropertyWithDo, showMessageBox } from "./jsreusablestructures";
import { fetchOwnUserData } from "./jsuserdata.js";
import { changeSelectedBoxStyle } from "./jsmenu.js";

function setPageChangeEvents() {
     const changePageItems = document.querySelectorAll(`[data-changepagestate="possible"]`);

     changePageItems.forEach((item) => {
          item.dataset.changepagestate = "valid";
     
          item.addEventListener("click", async(clickEvent) => {
               clickEvent.preventDefault();
               
               await changePageFullProcess(item);
               changeSelectedBoxStyle();
          });
     })
}


// change page
async function changePageFullProcess(selectedItem) {
     await changePage(selectedItem.name, selectedItem.href);
     changeSelectedBoxStyle();
}

async function changePage(pageName, pageUrl) {
     let documentHTML = await getPageHtml(pageUrl);

     if(documentHTML) {
          const pageTitle = document.querySelector("title");
          const mainPageURL = "../html/main.html"
          const historyUpdatedState = `${mainPageURL}?currentpage=${pageName}`

          pageTitle.innerText = formatPageString(pageName);
          history.replaceState({},"" , historyUpdatedState);

          toggleElements("reset", documentHTML);
          toggleElements("create", documentHTML);
     }


     function formatPageString(analyzedString) {
          let returnedString; 

          switch(analyzedString) {
               case "home":
                    returnedString = "Início"
                    break

               case "mycourses":
                    returnedString = "Meus cursos"
                    break

               case "managecourses":
                    returnedString = "Gerir cursos"
                    break

               case "manageusers":
                    returnedString = "Usuários"
                    break

               case "myuser":
                    returnedString = "Meu usuário"
                    break

               default:
          }
          
          return returnedString
     }

     
     function toggleElements(typeOfOperation, otherPageHTML) {
          const mCon = document.getElementById("mCon");
          const modalArea = document.getElementById("modalArea");

          switch(typeOfOperation) {
               case "create": 
                    createContent();

                    break

               case "reset":
                    resetContent();
                    break

               default:
          }



          // sub functions
          function createContent() {
               generateCSSFiles();
               generateBodyContents();


               function generateCSSFiles() {
                    const cssFiles = Array.from(otherPageHTML.querySelectorAll("head link.dynamicallyGeneratedCSS[rel=stylesheet]"));
                    const documentHead = document.head;

                    cssFiles.forEach((file) => {
                         documentHead.appendChild(file);
                    })
               }

               function generateBodyContents() {
                    let bodyElements = Array.from(otherPageHTML.body.children);

                    for(let currentElement = 0; currentElement < bodyElements.length; currentElement++) {
                         const selectedElement = bodyElements[currentElement];
                         const elementId = selectedElement.id;

                         // if -> prevents the loading of live server script
                         if(elementId) {
                              const insertOnElement = document.getElementById(elementId);
                              let selectedElementChildren = Array.from(selectedElement.children);

                              if(selectedElementChildren) {
                                   for(let selectedChild = 0; selectedChild < selectedElementChildren.length; selectedChild++) {
                                        let thisChild = selectedElementChildren[selectedChild];
                                        
                                        // for some reason, the scripts obtaineds from the fetched html file doesn't load or, more reasonably, it loads before on the other document. The fix is creating another element like further
                                        if(thisChild.classList.contains("dynamicallyGeneratedScript")) {
                                             let generatedScript = document.createElement("script");

                                             generatedScript.src = thisChild.src
                                             generatedScript.classList = thisChild.classList;  

                                             thisChild = generatedScript
                                        
                                        // avoid obtaining scripts without dynamicGeneratedScript class
                                        } else if(selectedElement.id === "scriptsSection") {
                                             thisChild = null;
                                        }


                                        if(thisChild != null) {
                                             insertOnElement.appendChild(thisChild);

                                        }
                                   }

                              }
                         }
                    }
               }

          }

          function resetContent() {
               // erase main content and modals
               mCon.innerHTML = "";

               if(modalArea) {
                    modalArea.innerHTML = "";
               }

               
               // delete generated scripts and css
               let elementsCreatedBefore = {
                    generatedScripts: document.querySelectorAll("script.dynamicallyGeneratedScript"),

                    generatedCSS: document.querySelectorAll("link.dynamicallyGeneratedCSS")
               }

               forEachPropertyWithDo({
                    selectedObject: elementsCreatedBefore, 
                    functionsArray: [
                         deleteElements
                    ]
               })
          }
     };

}


async function getPageHtml(selectedUrl) {
     let siteDocument = undefined;

     if(await requestConditionsMatch()) {
          await fetch(selectedUrl)
          .then(response => {
               if(response.ok) {
                    return response.text();

               } else {
                    showMessageBox("errorMessage", "Não foi possível inicializar a página selecionada.");
                    console.log("couldn't get the page.");
               }
          })
          .then(receivedHtml => {
               const parseHtmlXml = new DOMParser();
               siteDocument = parseHtmlXml.parseFromString(receivedHtml, "text/html");
          });

     }

     return siteDocument

     async function requestConditionsMatch() {
          const adminPageIdentifier = "adb";
          let response;

          if(selectedUrl.includes(adminPageIdentifier)) {
               const { usertype } = await fetchOwnUserData();
               if(usertype === "admin") response = true;
          
          } else {
               response = true
          }

          return response
     }
}


function preventUserFromAcessingTheHTMLFile(pageName) {
     document.addEventListener("readystatechange", redirectToSinglePageVersion())

     function redirectToSinglePageVersion() {
          if(!window.location.search) {
               // melhorar -- impedir carregamento

               const singlePageURL = `main.html?currentpage=${pageName}`
               window.location.replace(singlePageURL);
          }
     }
}



// reusable
function deleteElements(propertyName, propertyValue) {
     // property value === array
     let elementsArray = Array.from(propertyValue);

     for(let selectedElement = 0; selectedElement < elementsArray.length; selectedElement++) {
          elementsArray[selectedElement].remove();
     }
}


export { setPageChangeEvents, changePage, preventUserFromAcessingTheHTMLFile };

