import { forEachPropertyWithDo } from "./general/jsreusablestructures";

setPageChangeEvents();

function setPageChangeEvents() {
     let changePageItems = document.querySelectorAll(".changePageJS");

     changePageItems.forEach((item) => {
          item.addEventListener("click", async (event) => {
               let selectedPageName = event.currentTarget.name;

               event.preventDefault();
               await changePage(selectedPageName);
          });

     })
}


async function changePage(pageName) {
     let documentHTML = await getPageHtml(pageName);

     if(documentHTML) {
          window.history.pushState({}, "", );

          toggleElements("reset");
          toggleElements("create", documentHTML);
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
                                        if(selectedElement.id === "scriptsSection") {
                                             let generatedScript = document.createElement("script");

                                             generatedScript.src = thisChild.src
                                             generatedScript.classList = thisChild.classList;  
                                                                                        
                                             generatedScript.onload = () => {
                                                  console.log(`script ${generatedScript.src} carregado.`);
                                             }

                                             thisChild = generatedScript
                                        }

                                        insertOnElement.appendChild(thisChild);
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


async function getPageHtml(pageName) {
     let selectedUrl = `../../html/${pageName}Test.html`
     let siteDocument = false;

     await fetch(selectedUrl)
     .then(response => {
          if(response.ok) {
               return response.text();

          } else {
               console.log("couldn't get the page.");
               // show message...
          }
     })
     .then(receivedHtml => {
          const parseHtmlXml = new DOMParser();
          siteDocument = parseHtmlXml.parseFromString(receivedHtml, "text/html");
     });


     return siteDocument
}



// reusable
function deleteElements(propertyName, propertyValue) {
     // property value === array
     let elementsArray = Array.from(propertyValue);

     for(let selectedElement = 0; selectedElement < elementsArray.length; selectedElement++) {
          console.log(elementsArray[selectedElement] + "deletado")
          elementsArray[selectedElement].remove();
     }
}


