import { getDoc, doc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./jsfirebase.js";

let currentUserUID;

await obtainCurrentUID()
.then((returnedUserUID) => {currentUserUID = returnedUserUID});

export { fetchOwnUserData, currentUserUID};


// m function
async function fetchOwnUserData() {
     let userData;

     const uid = await obtainCurrentUID();
     userData = uid != null ? await obtainUserData() : "noDataObtained" 

     return userData === "noUserFound" ? false : userData
    

     // complementary
     async function obtainUserData() {
          const userDataDocument = doc(db, "usersInfo", uid);
          let obtainedResult;
          
          await getDoc(userDataDocument)
          .then((obtainedDataInstance) => {
               const dataId = obtainedDataInstance.id;

               userData = obtainedDataInstance.data();
               Object.defineProperty(userData, "uid", { value: dataId, enumerable: true});

               const { password, telephone, ...safeOwnUserData } = userData;

               obtainedResult = safeOwnUserData;

          })
          .catch((error) => {
               console.log(`ERROR: USER COULDN'T BE OBTAINED. CODE: ${error.code}`);
               obtainedResult = "noUserFound"
          })


          return obtainedResult
     }
};




async function obtainCurrentUID() {   
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


     return returnVal
}
