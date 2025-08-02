import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);

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
        <form className="p-12 bg-black opacity-80 text-white w-3/12 mx-auto mt-36 rounded-lg">
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

          <input
            type="text"
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-gray-600"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-600"
          />

          <button className="p-4 my-6 bg-red-700 w-full rounded-lg cursor-pointer">
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
