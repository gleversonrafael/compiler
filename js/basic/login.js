// firebase
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "./fb.js";


// global var
const mForm = document.getElementById("mForm");
let loginResult;

const msgCon = document.querySelector("#msgCon");
const closeMsgButton = document.querySelector("closeMsgB");





// events
mForm.addEventListener("submit", loginP)

document.getElementById("closeMsgB").addEventListener("click", 
  function closeMsg(){
    msgCon.style.display = "none"

    if(loginResult == "cor") {
      window.location.href = "./dashboard.html"
      console.log("redirect")
    }

  }
)



// functions
// main level
async function loginP(sEvent) {
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




// sec level
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

    msgIcon.setAttribute("src", "../media/ico/ico-verify.svg");
    
    msgType.innerHTML = "Sucesso"
    msgData.textContent = "Feche essa tela para acessar sua conta."

    msgCon.style.display = "flex"
  }



  function loginInc() {
    setClass()

    msgIcon.setAttribute("src", "../media/ico/ico-wrong.svg");
   
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

