import { getDoc, doc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./jsfirebase.js";


// current user basic information
const currentUserBasicInformation = await obtainCurrentUserBasicInformation();
export { fetchOwnUserData, currentUserBasicInformation};


async function obtainCurrentUserBasicInformation() {
     let data = {};

     await obtainCurrentUID()
     .then((returnedUserUID) => 
          Object.defineProperty(data, "uid", {
               value: returnedUserUID, enumerable: true,
          })
     );

     const { usertype } = await fetchOwnUserData();
     Object.defineProperty(data, "usertype", {
          value: usertype, enumerable: true,
     })

     return data;
}

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

               obtainedResult = userData;

          })
          .catch((error) => {
               console.log(`ERROR: USER COULDN'T BE OBTAINED. CODE: ${error.code}`);
               obtainedResult = "noUserFound"
          })


          return obtainedResult
     }
};




async function obtainCurrentUID() {   
     let receiveUID = new Promise((correct, wrong) => {
          onAuthStateChanged(auth, (uData) => { 
               uData ? correct(`u${uData.uid}`) : wrong("Null data.");                    
          
          });
     })

     let returnVal;

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
