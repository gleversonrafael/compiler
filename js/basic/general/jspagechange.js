import { forEachPropertyWithDo, showMessageBox } from "./jsreusablestructures";
import { fetchOwnUserData, currentUserBasicInformation } from "./jsuserdata.js";
import { removeAdminElements } from "./jspermissions.js"

import { changeSelectedBoxStyle } from "./jsmenu.js";

function setPageChangeEvents() {
     const changePageItems = document.querySelectorAll(`[data-changepagestate="possible"]`);

     changePageItems.forEach((item) => {
          item.dataset.changepagestate = "valid";
     
          item.addEventListener("click", async(clickEvent) => {
               clickEvent.preventDefault();
               
               await changePageFullProcess(item.name, item.dataset.selectedurl);
               changeSelectedBoxStyle();
          });
     })
}


// change page
async function changePageFullProcess(pageName, pageURL) {
     await changePage(pageName, pageURL);
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
                    returnedString = "Início";
                    break;

               case "mycourses":
                    returnedString = "Meus cursos";
                    break;

               case "managecourses-adb":
                    returnedString = "Gerir cursos";
                    break;

               case "manageusers-adb":
                    returnedString = "Usuários";
                    break;

               case "myuser":
                    returnedString = "Meu usuário";
                    break;

               default:
                    returnedString = "Página inexistente";
                    break;
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

               // uses elements with common ids in both documents and inserts one of them on another
               function generateBodyContents() {
                    const bodyElements = Array.from(otherPageHTML.body.children);

                    for(let currentElement = 0; currentElement < bodyElements.length; currentElement++) {
                         const selectedElement = bodyElements[currentElement], 
                         elementId = selectedElement.id;

                         if(elementId) {
                              const selectedElementChildren = Array.from(selectedElement.children);
                              const insertOnElement = document.getElementById(elementId);

                              // insert childrem
                              if(selectedElementChildren) {
                                   for(let selectedChild = 0; selectedChild < selectedElementChildren.length; selectedChild++) {
                                        let thisChild = selectedElementChildren[selectedChild];
                                        
                                        const adminElements = thisChild.querySelectorAll(".adminAcessJS");
                                        if(adminElements.length > 0 && currentUserBasicInformation.usertype != "admin") {
                                             removeAdminElements(adminElements);
                                        }

                                        // The scripts obtained from the fetched html only load on it and not on the current doucument. Fix:
                                        if(thisChild.classList.contains("dynamicallyGeneratedScript")) {
                                             const generatedScript = document.createElement("script");
                                             generatedScript.src = thisChild.src
                                             generatedScript.classList = thisChild.classList;  

                                             thisChild = generatedScript
                                        
                                        // avoid obtaining scripts without dynamicGeneratedScript class - dev only
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
                    modalArea.style.display = "none";
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

     if(requestConditionsMatch()) {
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

     function requestConditionsMatch() {
          const currentUserType = currentUserBasicInformation.usertype;
          const adminPageIdentifier = "adb";
          let response = false;

          if((selectedUrl.includes(adminPageIdentifier) && currentUserType === "admin") || !selectedUrl.includes(adminPageIdentifier)) {
               response = true;
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

