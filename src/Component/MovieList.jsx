import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log("Movies:", movies);

  return (
    <div className="px-6 pr-4 py-4 ">
        <h1 className="text-xl font-bold mb-2 text-white">{title}</h1>
     <div className="flex overflow-x-scroll">
         
         <div className="flex gap-4">
            {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
         </div>
     </div>
    </div>
  );
};

export default MovieList;
