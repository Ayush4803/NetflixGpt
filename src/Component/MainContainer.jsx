import React from 'react'
import { useSelector } from 'react-redux';
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {


    const movies = useSelector((store)=>store.movies?.nowPlayingMovies)


    
  return (
    <div>
      <VideoTitle />
      <VideoBackground />
    </div>
  )
}

export default MainContainer
