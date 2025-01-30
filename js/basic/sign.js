// imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./fb.js";





// gl variables
// form
const mForm = document.querySelector("#mForm"); 
const usersCol = collection(db, "usersInfo");


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
async function fSubmit(ev) {
    ev.preventDefault();
    console.clear()

    let credentialsCheck = checkFields();
    let checkUserExistence = signAttempt();

    setTimeout(final, 2000);

    // check fields
    function final() {
        if(credentialsCheck == true && checkUserExistence == true) {
            showMsgB("cor", "Cadastro efetuado!");
            console.log("Passed")
        
        } else if(credentialsCheck == false) {
            dataError("wrongCredentials");
    
        } else if(checkUserExistence == false) {
            dataError("userAlreadyExists");
    
        };
    }


}



function signAttempt() {
    createUserWithEmailAndPassword(auth, mForm.email.value, mForm.senha.value)
      .then(() => {
        console.log("User created!");

        addDoc(usersCol, {
            name: mForm.nome.value,
            email: mForm.email.value ,
            usertype: obtainRadSel()
        });

        console.log("User has been added!")


        return true

      })
      
      .catch(() => {
        return false

      });


    // compl
    function obtainRadSel() {
      let input = document.querySelector("input[type=radio]:checked");
      return input.value
    }

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
        console.log("Checkfields finalizado");
        return false
  
    } else {
        console.log("Checkfields finalizado")
        return true
    }




    // compl
    // gInput = generic input
    function analyzeGinp() {
        let mFormD = document.querySelectorAll(".mfDep"); // main form dependencies

        mFormD.forEach((gInput) => {        
            let aVal = gInput.value // analyzed value
            let ipN = gInput.name // input id

            // analyze each case
            if((aVal == "")   ||   (ipN == "nome" && aVal.length < 3)   ||   (ipN == "email" && ! aVal.includes("@"))   ||   (ipN == "senha" && aVal.length != 8))  {
                // visual
                console.log(`O campo ${ipN} não foi preenchido corretamente.`);
    
                // server-side
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




// s level
// dataError SSS
function dataError(param) {
    console.log("Error: " + param);

    let txtP;

    if(param == "wrongCredentials") {
        txtP = wrongC > 1? "Preencha corretamente as seções de: " : "Preencha corretamente a seção de ";
        textCreator();
    
    } else {
        txtP = "Esses dados já existem!";       
    }

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