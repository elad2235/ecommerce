import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHdKuXUawJZnImK3ENqyMCWU8bibAYHlQ",
  authDomain: "ecommerce-e707b.firebaseapp.com",
  projectId: "ecommerce-e707b",
  storageBucket: "ecommerce-e707b.appspot.com",
  messagingSenderId: "419717697133",
  appId: "1:419717697133:web:ee2560e532a7520dd33964",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
//export const googleAuthProvider = new firebase.auth.googleAuthProvider();
