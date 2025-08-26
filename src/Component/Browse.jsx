import React from "react";
import {  signOut } from "firebase/auth";
import { auth } from "../Utils/firebase"
import { useNavigate } from "react-router-dom";
const Browse = () => {
  const navigate=useNavigate();
const handleSignOut=()=>{
  signOut(auth).then(() => {
  navigate("/");
}).catch((error) => {
  navigate("/");
});
}

  return (
    <div className="bg-black min-h-screen text-white ">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-black ">
        <img
          className="w-32 cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix Logo"
        />
        <div className="flex items-center gap-4">
          <button onClick={handleSignOut} className="bg-red-600 px-4 py-2 rounded font-bold hover:bg-red-700 cursor-pointer">
            Logout
          </button>
          <img
            className="w-10 h-10 rounded cursor-pointer"
            src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
            alt="User Avatar"
          />
        </div>
      </header>
    </div>
  );
};

export default Browse;
