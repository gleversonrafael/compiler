import { collection, getDocs, query, where, limit } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./fb.js";


// var
let userData;

await userDataProcess();

// onAuthStateChanged(auth, userDataProcess); ADAPTAR --------------

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
                    if(uData) {
                         correct(uData.uid);
                    
                    } else {
                         wrong("Null data.");
                    } 
               
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
          const uQuery = query(collection(db, "usersInfo"), where("uid", "==", uid), limit(1));

          const userFindProcess = await getDocs(uQuery);
     
          userFindProcess.forEach((doc) => {
               userData = doc.data();
          })
     
     }
};



