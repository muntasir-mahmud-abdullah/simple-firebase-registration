// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqmCrLY-j65bXBvjIpxCY_jPpdqeFzo88",
  authDomain: "email-password-project-c8755.firebaseapp.com",
  projectId: "email-password-project-c8755",
  storageBucket: "email-password-project-c8755.firebasestorage.app",
  messagingSenderId: "287146179633",
  appId: "1:287146179633:web:063ca29685beec2c67e910"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);