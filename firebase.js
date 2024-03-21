import { initializeApp } from "@firebase/app";
import{getFirestore} from "@firebase/firestore"

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjxeMAEUYVFUmUScRuYHeABIKpJKbNLgo",
  authDomain: "ishita-project-4adb0.firebaseapp.com",
  projectId: "ishita-project-4adb0",
  storageBucket: "ishita-project-4adb0.appspot.com",
  messagingSenderId: "82860369034",
  appId: "1:82860369034:web:74765593ecc35ea31d7973",
  measurementId: "G-79H8V2K0RJ"
};

export const firebase=initializeApp(firebaseConfig);
export const auth =getAuth(firebase)
  
