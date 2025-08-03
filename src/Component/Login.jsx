import React, { useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { checkValidData } from "../Utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, // ✅ only using Email/Password now
} from "firebase/auth";
import { auth } from "../Utils/firebase";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true); // toggle between SignIn & SignUp
  const [errMsg, setErrmsg] = useState(null);

  const email = useRef(null);
  const password = useRef(null);

  // 🔹 Handle SignIn or SignUp with Email/Password
  const handleEmailPasswordLogin = () => {
    const errmessage = checkValidData(email.current.value, password.current.value);
    setErrmsg(errmessage);
    if (errmessage) return;

    if (!isSignInForm) {
      // ----------------- SIGN UP FLOW -----------------
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          console.log("✅ User Signed Up:", userCredential.user);
        })
        .catch((error) => {
          console.error("❌ Firebase SignUp Error:", error);
          setErrmsg(error.message);
        });
    } else {
      // ----------------- SIGN IN FLOW -----------------
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          console.log("✅ User Signed In:", userCredential.user);
        })
        .catch((error) => {
          console.error("❌ Firebase SignIn Error:", error);
          setErrmsg(error.message);
        });
    }
  };

  // Toggle between Sign In and Sign Up
  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_small.jpg"
        alt="background"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        {/* Center Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="p-12 bg-black opacity-80 text-white w-3/12 mx-auto mt-36 rounded-lg"
        >
          <h1 className="font-bold text-3xl py-2">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {/* Full Name only in SignUp */}
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-600"
            />
          )}

          {/* Email */}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-gray-600"
          />

          {/* Password */}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-600"
          />

          {/* Error Message */}
          <p className="text-red-500 font-bold text-lg py-2">{errMsg}</p>

          {/* 🔹 Email/Password Button */}
          <button
            type="button"
            className="p-4 my-4 bg-red-700 w-full rounded-lg cursor-pointer"
            onClick={handleEmailPasswordLogin}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          {/* Toggle SignIn/SignUp */}
          <div className="flex justify-center">
            <p className="cursor-pointer" onClick={toggleSignInForm}>
              {isSignInForm
                ? "New To Netflix? Sign Up Now"
                : "Already Registered? Sign In Now"}
            </p>
          </div>
        </form>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Login;
