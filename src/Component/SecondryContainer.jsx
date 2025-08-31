import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondryContainer = () => {
  const movies = useSelector((store) => store.movie);

  return (
    <div className="bg-black ">
      <div className=" pl-12 relative z-20 ">
      <MovieList title="Now Playing" movies={movies?.nowPlayingMovies || []} />
       <MovieList title="Popular" movies={movies?.popularMovies|| []} />
        <MovieList title="Top Rated" movies={movies?.topRated || []} />
         <MovieList title="Upcoming" movies={movies?.Upcoming || []} />
         </div>
    </div>
  );
};

export default SecondryContainer;