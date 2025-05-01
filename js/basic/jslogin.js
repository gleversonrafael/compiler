// firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, usersCol } from "./general/jsfirebase.js";
import { obtainDocumentDataFromField, showMessageBox } from "./general/jsreusablestructures.js"


// global var
let loginResult;
const messageContent = document.querySelector("#msgCon");


// login user
document.getElementById("mForm").addEventListener("submit", loginPerson);

async function loginPerson(saveEvent) {
    const loginForm = document.getElementById("mForm");
    saveEvent.preventDefault();

    // user data
    const userEmail = loginForm.email.value, userPassword = loginForm.passw.value;
    const validationResponse = await isUserActive(userEmail);
    
    let messageContent, messageType;

    if(validationResponse === "dataIsAcessible") {
      await signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(() => {
        window.location.href = "./html/main.html?currentpage=home";
      
      })
      .catch((error) => {
        messageType = "errorMessage";
        messageContent = "Credenciais incorretas.";

        console.log(error.code);
      });
    
    } else{
      messageType = "errorMessage";
      messageContent = "Usuário inexistente ou inacessível";
    } 

    if(messageType && messageContent) showMessageBox(messageType, messageContent);
}

async function isUserActive(receivedEmail) {
  const userInformation = {collectionVariable: usersCol, fieldName: "email", fieldValue: receivedEmail};
  const thisUserData = await obtainDocumentDataFromField(userInformation);

  let response;

  if(thisUserData && thisUserData.active === true && thisUserData.deleted === false) {
    response = "dataIsAcessible"

  } else if(!thisUserData) {
    response = "dataDoesntExists"

  } else {
    response = "dataIsNotAcessible"
  }

  console.log(response);

  return response;
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

    messageContent.style.display = "flex"
  }



  function loginInc() {
    setClass()

    msgIcon.setAttribute("src", "../media/ico/login/ico-error.svg");
   
    msgType.textContent = "Erro"
    msgData.textContent = "Dados incorretos"

    messageContent.style.display = "flex"
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
  messageContent.style.display = "none"

  if(loginResult == "cor") {
    window.location.href = "./html/main.html?currentpage=home"
  }

}
