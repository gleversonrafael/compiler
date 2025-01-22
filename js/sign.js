// gl variables
const mForm = document.querySelector("#mForm"); 
const nameInp = document.getElementById("nameInp");




// events
mForm.addEventListener("submit", fSubmit);




nameInp.addEventListener("change", (nEv) => {
    if(nEv.target.value.length < 3) {
        nEv.target.style.border = "2px solid var(--razz)";

    } else {
        nEv.target.style.border = "2px solid var(--aqua)";
    }

} )



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

function verInp() {

}





// s level

// checkFields SSS
let wrongC;

function checkFields() {
    // var
    let dList = {nome: true, email: true, senha: true, senhacadastral: true, tusuario: true};
    
    wrongC = 0;

    // are the inputs filled?   
    analyzeGinp()
    analyzeRad()

    // checkResult
    if(Object.values(dList).includes(false)) {
        return dList
  
    } else {
        return true
    }




    // compl
    function analyzeGinp() {
        let mFormD = document.querySelectorAll(".mfDep"); // main form dependencies

        mFormD.forEach((gInput) => {        
            if(gInput.value == "") {
                // visual
                console.log(`Error 001. ${gInput.id} isn't correctly filled.`);
                gInput.style.border = "2px solid var(--razz)";
    
                dList[gInput.name] = false;
                wrongC++;
            }
        })

    }

    function analyzeRad() {
        let radioSel = document.querySelector("input[name=userType]:checked");

        if(radioSel == null) {
            dList.tusuario = false;
            wrongC++;
        } 
    }
}


// dataError SSS
function dataError(dataOB) {
    console.log("Invalid form data");
    
    let createP = document.createElement("p");
    let txtP = wrongC > 1? "Preencha as seções de: " : "Preencha a seção de "

    textCreator();
    blockS();


    // complementary functions
    function textCreator() {
        for(let attr in dataOB) {
            if(dataOB[attr] == false) {             
                addNtxt(attr)
                addComma()
                wrongC--;
    
            }
        }
    }


    
    function addNtxt(attr) {
        if(attr == "email") {
            txtP += "e-mail";

        } else if (attr == "senhacadastral") {
            txtP += "senha cadastral";

        } else if (attr == "tusuario") {
            txtP += "tipo de usuário";
        
        } else {
            txtP += `${attr}`;
        }
    }



    function addComma() {
        //last one?
        if((wrongC - 2) == 0) {
            txtP += " e "

        } else if((wrongC - 1) == 0) {
            txtP += "."

        } else {
            txtP += ", "
        }

    }


    function blockS() {
        msgB.innerHTML = "";

        let txtC = document.createTextNode(txtP);

        createP.appendChild(txtC);
        msgB.appendChild(createP);

        msgB.style.display = "flex";
    }
}






// t level