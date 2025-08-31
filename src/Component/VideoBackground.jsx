import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movie.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className="w-screen">
      {trailerVideo && (
        <iframe
          className="w-screen aspect-video" // Tailwind for responsive sizing
          src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1`}
          title="YouTube trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default VideoBackground;
