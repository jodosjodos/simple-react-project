// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from  "firebase/auth" 
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvwRanUNctkY8S0WaLYRUgPURtqewYIIs",
  authDomain: "react-work-aaa5f.firebaseapp.com",
  projectId: "react-work-aaa5f",
  storageBucket: "react-work-aaa5f.appspot.com",
  messagingSenderId: "295720962917",
  appId: "1:295720962917:web:714da80fa871c9c3e0af8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const provider =new GoogleAuthProvider()
export const db=getFirestore(app);