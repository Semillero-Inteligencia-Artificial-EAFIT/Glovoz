import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5JCJVSOhibb3vH0rENt-39cqBZPg3XEg",
  authDomain: "superchat-35611.firebaseapp.com",
  projectId: "superchat-35611",
  storageBucket: "superchat-35611.appspot.com",
  messagingSenderId: "320400652770",
  appId: "1:320400652770:web:28d8d67982ade826c721bb",
  measurementId: "G-DCDM21L1L3",
};

const app = firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const db = getFirestore(app);
