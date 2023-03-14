import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAfkJ-7ZnHGVCXJTc2pCqMR81zuX6KTfJ8",
  authDomain: "react-firebase-auth-c745c.firebaseapp.com",
  projectId: "react-firebase-auth-c745c",
  storageBucket: "react-firebase-auth-c745c.appspot.com",
  messagingSenderId: "1000550742352",
  appId: "1:1000550742352:web:a4778eadf6203a8a021455"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export const db = getFirestore(app);
// export const db = getDatabase(app);

export default auth;