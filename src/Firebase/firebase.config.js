// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIBr6Y-BQvH5b2-VLyPySJxIBk6cqxgAw",
  authDomain: "habit-tracker-app-1e862.firebaseapp.com",
  projectId: "habit-tracker-app-1e862",
  storageBucket: "habit-tracker-app-1e862.firebasestorage.app",
  messagingSenderId: "187634347215",
  appId: "1:187634347215:web:15bcb35b3cd05f21bb5bba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);