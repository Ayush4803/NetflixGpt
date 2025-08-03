// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCO6BCM3N5i5tUlwGuxlHOjEXxjVbVxSYs",
  authDomain: "netflixgpt-aa321.firebaseapp.com",
  projectId: "netflixgpt-aa321",

  // ❌ FIXED: was `firebasestorage.app` → must be `appspot.com`
  storageBucket: "netflixgpt-aa321.appspot.com",

  messagingSenderId: "845683410439",
  appId: "1:845683410439:web:ea9d1a3e456c1a82a2cca2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Pass app explicitly here
export const auth = getAuth(app);
