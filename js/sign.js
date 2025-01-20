// variables
const mForm = document.querySelector("#mForm");

mForm.addEventListener("submit", (ev) => {
    if(checkFields() == true) {
        ev.preventDefault();
        

    } else {
        ev.preventDefault() ;
    }

});


// functions
function checkFields() {
    let fields = {namI: true, emaI: true, pasI: true, useI, sPasI: true}
    
    if(mForm.name.length = 0) {
        console.log("Error")
        return false

    }
}