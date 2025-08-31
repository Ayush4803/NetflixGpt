import React from 'react'
import GptSearchbar from "./GptSearchbar"
import GptMoviesuggestion from "./GptMoviesuggestion";
import { bgLogo } from "../Utils/constant"


const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img
        src={bgLogo}
        alt="logo"
        />
      </div>
      <GptSearchbar/>
      <GptMoviesuggestion/>
      
    </div>
  )
}

export default GptSearch
