import React from 'react'
import { useSelector } from 'react-redux';
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movie?.topRated);

  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[18];
  // console.log(mainMovie);


  const {title,overview,id} = mainMovie;
    
  return (
    <div>
      <VideoTitle  title={title} overview={overview} />
      <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer
