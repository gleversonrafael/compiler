// gl variables
// form
const mForm = document.querySelector("#mForm"); 
const nameInp = document.getElementById("nameInp");


// data list and wrong counter
let dList = {nome: true, email: true, senha: true, senhacadastral: true, tusuario: true};
let wrongC;


// others
const msgB = document.getElementById("msgB");
const closeMB = document.querySelector("#closeMsg");






// events
mForm.addEventListener("submit", fSubmit);
closeMB.addEventListener("click", hideMsgB);




// functions
// main level - independents
// ---------------------------------
function fSubmit(ev) {
    console.clear()

    // check fields
    if(checkFields() == true) {
        ev.preventDefault();
        

        console.log("Valid");
    
    } else {
        ev.preventDefault();
        dataError();
    };

    console.log(dList);
}


function hideMsgB() {
    msgB.style.display = "none";
}





// secondary level
// ---------------------------------
function checkFields() {
    wrongC = 0;

    // are the inputs filled?   
    analyzeGinp()
    analyzeRad()

    
    // send Result
    if(Object.values(dList).includes(false)) {
        return false
  
    } else {
        return true
    }




    // compl
    function analyzeGinp() {
        let mFormD = document.querySelectorAll(".mfDep"); // main form dependencies

        mFormD.forEach((gInput) => {        
            let aVal = gInput.value // analyzed value
            let ipN = gInput.name // input id

            // analyze each case
            if((aVal == "")   ||   (ipN == "nome" && aVal.length < 3)   ||   (ipN == "email" && ! aVal.includes("@"))   ||   (ipN == "senha" && aVal.length != 8)   ||   (ipN == "senhacadastral" && aVal != "appmoove"))  {
                // visual
                console.log(`O campo ${ipN} não foi preenchido corretamente.`);
    
                dList[ipN] = false;
                wrongC++;
            
            } else {
                dList[ipN] = true;
            }
        })

    }


    function analyzeRad() {        
        let radioSel = document.querySelector("input[name=userType]:checked");

        if(radioSel == null) {
            dList.tusuario = false;
            wrongC++;

            console.log(`O campo tipo de usuários não foi preenchido`);
        } else {
            dList.tusuario = true;
        } 
    }
}


// dataError SSS
function dataError() {
    console.log("Invalid form data");
    
    let txtP = wrongC > 1? "Preencha corretamente as seções de: " : "Preencha corretamente a seção de "
    textCreator();

    msgError();


    // complementary functions
    function textCreator() {
        for(let attr in dList) {
            if(dList[attr] == false) {             
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


    function msgError() {
        removeP()

        let createP = document.createElement("p");
        let txtC = document.createTextNode(txtP);

        createP.appendChild(txtC);
        msgB.appendChild(createP);

        showMsgB("wrong")
    }

    function removeP() {
        if(document.querySelector("#msgB > p") != null) {
            msgB.removeChild(document.querySelector("#msgB > p"));
        }
    }

}






// third level
function showMsgB() {
    msgB.style.display = "flex";

    if(msgB.classList.contains("inc")) {
        console.log("Incorrect message");
         
    } else {
        console.log("Correct message");

    }


    if("wrong") {
        msgB.classList.add("inc");
        closeMB.classList.add("inc");
    
    } else {
        msgB.classList.add("cor");
        closeMB.classList.add("cor");
    }
}