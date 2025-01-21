// gl variables
const mForm = document.querySelector("#mForm"); 




// events
mForm.addEventListener("submit", fSubmit);




// functions
// m level
function fSubmit(ev) {
    let analyzeT = checkFields();

    if(analyzeT == true) {
        console.log("Valid");
    
    } else {
        ev.preventDefault();
        dataError(analyzeT);
    };
}




// s level
function checkFields() {
    let mFormD = document.querySelectorAll(".mfDep"); // main form dependencies
    let dList = {nome: true, email: true, senha: true, senhacadastral: true};


    // are the inputs filled
    mFormD.forEach((gInput) => {        
        if(gInput.value == "") {
            // visual
            console.log(`Error 001. ${gInput.id} isn't correctly filled.`);
            gInput.style.border = "2px solid var(--razz)";

            dList[gInput.name] = false;
        }

    })


    // alert
    if(Object.values(dList).includes(false)) {
        return dList
  
    } else {
        return true
    }
}


function dataError(dataOB) {
    console.log("Invalid form data");
    
    let createP = document.createElement("p");


    // Seções // seção -- contador
    let txtP = "Preencha as seções de: "

    // [] = string -- . = directory
    // consertar a inserção de , com um determinador do número de inputs errados

    for(let attr in dataOB) {
        if(dataOB[attr] == false) {             
            if(attr == "email") {
                txtP += "e-mail, ";

            } else if (attr == "senhaespecial") {
                txtP += "senha especial ";
        
            } else {
                txtP += `${attr}, `;
            }
        }
    }
    
    let txtC = document.createTextNode(txtP);

    msgB.style.display = "block";
    
    msgB.appendChild += createP;
    createP.innerHTML = txtP;

    console.log(createP);
}




// t level