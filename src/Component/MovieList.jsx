import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, onMovieClick }) => {
  return (
    <div className="px-4 sm:px-6 py-4 w-full">
      <h1 className="text-xl font-bold mb-2 text-white">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar gap-4">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
            onClick={() => onMovieClick(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
