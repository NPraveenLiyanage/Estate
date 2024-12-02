// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API , //securing the api key if we publish this
  authDomain: "estate-36bf8.firebaseapp.com",
  projectId: "estate-36bf8",
  storageBucket: "estate-36bf8.firebasestorage.app",
  messagingSenderId: "673455375965",
  appId: "1:673455375965:web:e34205391916308e8f2fb4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);