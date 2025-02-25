// firebase
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../general/jsfirebase.js";


// global var
let loginResult;
const msgCon = document.querySelector("#msgCon");



// login user
document.getElementById("mForm").addEventListener("submit", loginP)


async function loginP(sEvent) {
    let mForm = document.getElementById("mForm");
    sEvent.preventDefault();

    // user data
    const emailD = mForm.email.value;
    const passD = mForm.passw.value ;


    loginResult = await signInWithEmailAndPassword(auth, emailD, passD)
    .then(() => {
      return "cor";

    })
    .catch((err) => {
      console.log(err.code);
      return "inc";

    });

    showMsg(loginResult);
}




// show and close message box
document.getElementById("closeMsgB").addEventListener("click", closeMsg);


function showMsg(msgObtained) {
  // var
  const msgType = document.querySelector("h1#msgT");
  const msgData = document.querySelector("p#msgD");
  const msgIcon = document.querySelector("img#msgIco");

  // is the login correct?
  if(msgObtained == "cor") {
    loginCor();

  } else {
    loginInc();
  }


  // compl
  function loginCor() {
    setClass()

    msgIcon.setAttribute("src", "../media/ico/login/ico-verify.svg");
    
    msgType.innerHTML = "Login concluído"
    msgData.textContent = "Feche essa tela para acessar sua conta."

    msgCon.style.display = "flex"
  }



  function loginInc() {
    setClass()

    msgIcon.setAttribute("src", "../media/ico/login/ico-error.svg");
   
    msgType.textContent = "Erro"
    msgData.textContent = "Dados incorretos"

    msgCon.style.display = "flex"
  }



  function setClass() {
    // remove oposite class
    if(msgObtained == "cor" && msgType.classList.contains("inc")) {
        msgType.classList.remove("inc");  

    } else if(msgObtained == "inc" && msgType.classList.contains("cor")) {
      msgType.classList.remove("cor");  
    }

    // addClass
    msgType.classList.add(msgObtained);  
  }
}


function closeMsg(){
  msgCon.style.display = "none"

  if(loginResult == "cor") {
    window.location.href = "./navigate.html"
  }

}
