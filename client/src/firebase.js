// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import { getAuth } from "firebase/auth";

import 'firebase/compat/auth'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyBStVhOE_JzcsEly9BriYl37QSZkudrbJ8",
  authDomain: "pweb-b0fd1.firebaseapp.com",
  databaseURL: "https://pweb-b0fd1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pweb-b0fd1",
  storageBucket: "pweb-b0fd1.appspot.com",
  messagingSenderId: "218991876129",
  appId: "1:218991876129:web:4605ca819b2c730b2dab60",
  measurementId: "G-7EQMLSL5M0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//export const auth = app.auth()
export const auth = getAuth(app);
export var database = firebase.database();


export default app