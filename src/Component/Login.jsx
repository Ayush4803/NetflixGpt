import React from 'react'
import Header from "./Header";

const Login = () => {
  return (
    <div>
      <Header />

    <div className="absolute inset-0">
  <img
    className="w-full h-full object-cover"
    src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_small.jpg"
    alt="background"
  />
</div >

     
    <form className="relative z-10 p-12 bg-black text-white w-3/12 mx-auto my-36 rounded-lg bg-opacity-90">
     <h1 className="font-bold text-3xl py-2">Sign In</h1>
     <input type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-600" />
     <input type="text" placeholder="Password" className="p-4 my-4 w-full bg-gray-600" />
     <button className="p-4 my-6 bg-red-700 w-full rounded-lg cursor-pointer"> Sign In</button>

     </form>

    </div>
  )
}

export default Login
