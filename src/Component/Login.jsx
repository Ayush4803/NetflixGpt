import React, { useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { checkValidData } from "../Utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { bgLogo } from "../Utils/constant";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errMsg, setErrmsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // 👈 new state

  const email = useRef(null);
  const password = useRef(null);

  // Handle SignIn or SignUp
  const handleEmailPasswordLogin = () => {
    const errmessage = checkValidData(email.current.value, password.current.value);
    setErrmsg(errmessage);
    if (errmessage) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          console.log("✅ User Signed Up:", userCredential.user);
        })
        .catch((error) => {
          console.error("❌ Firebase SignUp Error:", error);
          setErrmsg(error.message);
        });
    } else {
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
              type={showPassword ? "text" : "password"} // 👈 toggle here
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
