import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAYOSSSxnsxVC15gTquoTsuMVT4IDhv9I0",
    authDomain: "compiler-d5a27.firebaseapp.com",
    projectId: "compiler-d5a27",
    storageBucket: "compiler-d5a27.firebasestorage.app",
    messagingSenderId: "583684137760",
    appId: "1:583684137760:web:6f9a616e523c3ca9c3ed45",
    measurementId: "G-YLMPS766HP"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const usersCol = collection(db, "usersInfo");
const coursesCol = collection(db, "courses");
export { firebaseConfig };
export { app };
export { db };
export { auth };
export { usersCol };
export { coursesCol };


