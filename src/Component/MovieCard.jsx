import React from "react";
import { IMG_CDN_URL } from "../Utils/constant";

const MovieCard = ({ posterPath, onClick }) => {
  return (
    <div className="flex-shrink-0 cursor-pointer" onClick={onClick}>
      <img
        className="w-40 h-auto rounded-md shadow-md"
        alt="Movie Poster"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};

export default MovieCard;
