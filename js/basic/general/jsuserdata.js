import { getDoc, doc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./jsfirebase.js";



// SISTEMA FUTURO - A DATA É RETORNADA EM VARIÁVEL E NÃO ARMAZENADA.

// var
let userData;

await userDataProcess();
export { userData };


// m function
async function userDataProcess() {
     let uid = await obtainUID();

     if(uid != null) {
          await obtainUserData();
     }
    


     // complementary
     async function obtainUID() {   
          // var
          let receiveUID = new Promise((correct, wrong) => {
               onAuthStateChanged(auth, (uData) => { 
                    uData ? correct(`u${uData.uid}`) : wrong("Null data.");                    
               
               });
          })

          let returnVal;


          // m process
          await receiveUID
          .then((res) => {
               returnVal = res;

          })

          .catch((errorMsg) => {
               console.log(errorMsg);
               returnVal = null;
          });


          return returnVal;
     }


     async function obtainUserData() {
          const userDataDocument = doc(db, "usersInfo", uid);
          
          await getDoc(userDataDocument)
          .then((obtainedDataInstance) => {
               const dataId = obtainedDataInstance.id;

               userData = obtainedDataInstance.data();
               Object.defineProperty(userData, "uid", { value: dataId, enumerable: true});

               const { password, telephone, ...safeOwnUserData } = userData;
               userData = safeOwnUserData

          })
          .catch((error) => {
               console.log(`ERROR: USER COULDN'T BE OBTAINED. CODE: ${error.code}`);
          })
     
     }
};
