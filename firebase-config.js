import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCALe4wo48Uie7a1bBRCNMqpinYr6lE6H8",
    authDomain: "socialbook-df495.firebaseapp.com",
    projectId: "socialbook-df495",
    storageBucket: "socialbook-df495.appspot.com",
    messagingSenderId: "117833981838",
    appId: "1:117833981838:web:b5bd004c22d43c8cb98edf",
    measurementId: "G-9VDSRPBEXD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
