import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";

// config object
const firebaseConfig = {
    apiKey: "AIzaSyB1WGymb_cLDKmA9IS8UPFU8bfaaxwTq-U",
    authDomain: "recipes-app-de234.firebaseapp.com",
    projectId: "recipes-app-de234",
    storageBucket: "recipes-app-de234.appspot.com",
    messagingSenderId: "253179744424",
    appId: "1:253179744424:web:b08358fcad747196b9729d"
  };
// initialize firebase
const app = initializeApp(firebaseConfig);

//initialize servesses

const db = getFirestore(app) ;

export default db