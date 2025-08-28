import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { netflixLOGO, userAvatar, API_OPTIONS } from "../Utils/constant";
import { useDispatch } from "react-redux";
// import { addnowPlayingMovies } from "../Utils/movieSlice";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from "./MainContainer";
import SecondryContainer from "./SecondryContainer";


const Browse = () => {

  useNowPlayingMovies()
  const navigate = useNavigate();


  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/"));
  };

 
  return (
    <div className=" min-h-screen text-white">
      <header className="flex items-center justify-between px-8 py-4 ">
        <img className="w-32 cursor-pointer" src={netflixLOGO} alt="Netflix Logo" />
        <div className="flex items-center gap-4">
          <button
            onClick={handleSignOut}
            className="bg-red-600 px-4 py-2 rounded font-bold hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
          <img className="w-10 h-10 rounded cursor-pointer" src={userAvatar} alt="User Avatar" />
        </div>
      </header>


    <MainContainer/>
    <SecondryContainer/>
    
    </div>
  );
};

export default Browse;
