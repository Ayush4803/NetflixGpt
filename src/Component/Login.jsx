import React, { useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { checkValidData } from "../Utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { bgLogo } from "../Utils/constant";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errMsg, setErrmsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // 👈 new state

  const email = useRef(null);
  const password = useRef(null);

  // Handle SignIn or SignUp
  const handleEmailPasswordLogin = () => {
    const errmessage = checkValidData(email.current.value, password.current.value);
    setErrmsg(errmessage);
    if (errmessage) return;

    // 👇 set persistence before login
    setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
      .then(() => {
        if (!isSignInForm) {
          // ---- SIGN UP ----
          return createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );
        } else {
          // ---- SIGN IN ----
          return signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );
        }
      })
      .then((userCredential) => {
        console.log("✅ User Authenticated:", userCredential.user);
      })
      .catch((error) => {
        console.error("❌ Firebase Auth Error:", error);
        setErrmsg(error.message);
      });
  };

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm);
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={bgLogo}
        alt="background"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <form
          onSubmit={(e) => e.preventDefault()}
          className="p-12 bg-black opacity-80 text-white w-3/12 mx-auto mt-36 rounded-lg"
        >
          <h1 className="font-bold text-3xl py-2">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

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

          {/* Password + toggle */}
          <div className="relative">
            <input
              ref={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="p-4 my-4 w-full bg-gray-600 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-300"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* ✅ Keep me logged in */}
          <div className="flex items-center gap-2 my-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="text-sm">
              Keep me logged in
            </label>
          </div>

          {/* Error Message */}
          <p className="text-red-500 font-bold text-lg py-2">{errMsg}</p>

          <button
            type="button"
            className="p-4 my-4 bg-red-700 w-full rounded-lg cursor-pointer"
            onClick={handleEmailPasswordLogin}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

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
