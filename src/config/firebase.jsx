import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"; 
import {getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFsKR4WitHgVhK2QWBzqC9i99IiustxpA",
  authDomain: "fir-course2-12496.firebaseapp.com",
  projectId: "fir-course2-12496",
  storageBucket: "fir-course2-12496.appspot.com",
  messagingSenderId: "596343283833",
  appId: "1:596343283833:web:5c08c2b6ea445badf474a8",
  measurementId: "G-1HMW04KEPK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);