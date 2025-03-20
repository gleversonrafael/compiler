// set events on load
function setFunctionsOnLoad(functionsArray) {
     // functions must be on the same scope.
     for(let currentFunction = 0; currentFunction < functionsArray.length; currentFunction ++) {
          document.body.addEventListener("load", functionsArray[currentFunction]());
     }
}


// platform load
function deletePlatformLoad() {
     const loadingGroup = document.querySelector(".loadingGroup");
     loadingGroup.remove();
}


// skeletons
async function removeSkeletons() {
     const selectedSkeletons = Array.from(document.querySelectorAll(".loadingSkeleton"));

     if(selectedSkeletons) {
          for(let thisSkeleton = 0; thisSkeleton < selectedSkeletons.length; thisSkeleton ++ ) {
               selectedSkeletons[thisSkeleton].classList.remove("loadingSkeleton");
          }
     }
}


export { setFunctionsOnLoad, deletePlatformLoad, removeSkeletons }