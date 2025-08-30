import React from "react";
import { netflixLOGO } from "../Utils/constant";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-20 flex items-center px-8 py-4">
      <img
        className="w-40" // Changed from w-42 to w-40
        src={netflixLOGO}
        alt="Netflix Logo"
      />
    </div>
  );
};

export default Header;
