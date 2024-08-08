// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQtZ4plTU0RmM-NRQdL7iLZkiYFRRpbkc",
  authDomain: "inventory-app-7aad7.firebaseapp.com",
  projectId: "inventory-app-7aad7",
  storageBucket: "inventory-app-7aad7.appspot.com",
  messagingSenderId: "598911535618",
  appId: "1:598911535618:web:987416123d29ef152ff51b",
  measurementId: "G-W6BTTFXR4W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
