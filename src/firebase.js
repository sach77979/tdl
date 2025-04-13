// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// ✅ Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6OLSxCv7uF18bTqLobNpbRk115ToUtU0",
  authDomain: "taskmang-27ee0.firebaseapp.com",
  projectId: "taskmang-27ee0",
  storageBucket: "taskmang-27ee0.appspot.com", // ✅ Fixed typo: ".app" ➜ ".app**spot.com**"
  messagingSenderId: "408867081865",
  appId: "1:408867081865:web:c466b20ae366900c09c058",
  measurementId: "G-WLHV1ER7TC",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Optional: Initialize Analytics (only in browser environment)
if (typeof window !== "undefined") {
  getAnalytics(app); // No unused variable warning
}

export default app;
