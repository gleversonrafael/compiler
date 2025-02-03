import { collection, getDocs, query, where, limit } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./fb.js";


// var
let userData;

await userDataProcess();


// m function
async function userDataProcess() {
     let uid = await obtainUID();
     await obtainUserData();


     // complementary
     async function obtainUID() {   
          let receiveUID = new Promise((correct, wrong) => {
               onAuthStateChanged(auth, (uData) => {                        
                    if(uData.uid) {
                         correct(uData.uid);
                    
                    } else {
                         wrong("An unknown error has been found.")
                    } 
               
               });
          })

          let returnVal;

          await receiveUID
          .then((res) => {
               returnVal = res;

          })

          .catch((errorMsg) => {
               console.log(errorMsg);
          });

          return returnVal;
     }


     async function obtainUserData() {
          const uQuery = query(collection(db, "usersInfo"), where("uid", "==", uid), limit(1));

          const userFindProcess = await getDocs(uQuery);
     
          userFindProcess.forEach((doc) => {
               userData = doc.data();
          })
     
     }
};




export { userData };