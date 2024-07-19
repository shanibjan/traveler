// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQU9CdGbCZ7eKCS6_JVXSazuyF5DX2UrE",
  authDomain: "fb-traveler.firebaseapp.com",
  projectId: "fb-traveler",
  storageBucket: "fb-traveler.appspot.com",
  messagingSenderId: "939524696573",
  appId: "1:939524696573:web:16c90f24f8ec696fead194",
  measurementId: "G-FJ683N5Y0Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);