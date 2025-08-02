import React, { useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import {checkValidData} from "../Utils/Validate";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [errMsg, setErrmsg]= useState(null);

const email=useRef(null);
const password=useRef(null);
// const name=useRef(null);




const handaleButtonClick=()=>{ 
  //Validates the form Data

// console.log(email.current.value);
// console.log(password.current.value);
// console.log(name);

const errmessage= checkValidData(email.current.value, password.current.value);
//  console.log(errmessage);
setErrmsg(errmessage);



}

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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        {/* Center Form */}
        <form onSubmit={(e)=>e.preventDefault()}className="p-12 bg-black opacity-80 text-white w-3/12 mx-auto mt-36 rounded-lg">
          <h1 className="font-bold text-3xl py-2">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
            // ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-600"
            />
          )}

          <input
          ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-gray-600"
          />

          <input
           ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-600"
          />
          
          <p className="text-red-500 font-bold text-lg py-2">{errMsg}</p>

          <button className="p-4 my-6 bg-red-700 w-full rounded-lg cursor-pointer" onClick={handaleButtonClick}>
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

        {/* Footer */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Login;
