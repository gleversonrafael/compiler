// gl variables
// form
const mForm = document.querySelector("#mForm"); 
const nameInp = document.getElementById("nameInp");


// data list and wrong counter
let dList = {nome: true, email: true, senha: true, senhacadastral: true, tusuario: true};
let wrongC;


// others
const closeMB = document.querySelector("#closeMsg");
const msgB = document.getElementById("msgB");







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

        showMsgB("cor", "Cadastro efetuado! ");
    
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

    showMsgB("inc", txtP)




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

}






// third level
function showMsgB(msgT, content /* msg type == incorrect/correct*/ ) {
    createText()

    if(msgB.classList.contains(msgT) == false) {
        verifyRemoveAttr();  
        addAttr();
    } 


    if(msgT == "cor") {
        let p = document.querySelector("#msgB > p");

        p.innerHTML += "<span> <a href=../html/log.html> Entre aqui </a> <span>"
    }

    msgB.style.display = "flex";



    // compl
    function createText() {
        if(document.querySelector("#msgB > p") != null) {
            msgB.removeChild(document.querySelector("#msgB > p"));
        }

        let createP = document.createElement("p");
        let txtC = document.createTextNode(content);
    
        createP.appendChild(txtC);
        msgB.appendChild(createP);
    }


    function verifyRemoveAttr() {
        if(msgT == "inc" && msgB.classList.contains("cor")) {
            msgB.classList.remove("cor");
            closeMB.classList.remove("cor");
        
        } else if(msgB.classList.contains("inc")) {
            msgB.classList.remove("inc");
            closeMB.classList.remove("inc");
        }
    }


    function addAttr() {
        msgB.classList.add(msgT);
        closeMB.classList.add(msgT);
    }
}