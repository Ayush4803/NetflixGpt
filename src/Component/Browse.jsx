import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { netflixLOGO, userAvatar } from "../Utils/constant";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import usetopRated from "../hooks/usetopRated";
import useUpcoming from "../hooks/useUpcoming";
import MainContainer from "./MainContainer";
import SecondryContainer from "./SecondryContainer";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  usetopRated();
  useUpcoming();

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/"));
  };

  const handlePayment = () => {
    navigate("/payment");
  };

  return (
    <div className="min-h-screen text-white">
      <header className="flex items-center justify-between px-8 py-4 relative">
        {/* Logo */}
        <img className="w-32 cursor-pointer" src={netflixLOGO} alt="Netflix Logo" />

        <div className="flex items-center gap-4">
          {/* Welcome Badge */}
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:scale-105 transform transition-transform cursor-default">
            Welcome{" "}
            {auth.currentUser?.displayName || auth.currentUser?.email?.split("@")[0] || "User"}
          </span>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            className="bg-purple-600 px-4 py-2 rounded font-bold hover:bg-purple-700 cursor-pointer transition-colors"
          >
            Payment
          </button>

          {/* Avatar Dropdown */}
          <div className="relative">
            <img
              src={userAvatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm font-bold bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <MainContainer />
      <SecondryContainer />
    </div>
  );
};

export default Browse;
