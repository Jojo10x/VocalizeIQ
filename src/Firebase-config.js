import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB63SQtmRb6CvZpN7cNUxxNwNZL3QEMMHs",
  authDomain: "vocalizeiq.firebaseapp.com",
  projectId: "vocalizeiq",
  storageBucket: "vocalizeiq.appspot.com",
  messagingSenderId: "586167934257",
  appId: "1:586167934257:web:39634c3ae6289fe47da410",
  measurementId: "G-MRQNLQJQ8X"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);