import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { addtrailerVideo } from "../Utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideo = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();

      if (!json.results) return;

      // 🎬 Find Trailer first, fallback to Teaser
      const trailer =
        json.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        ) ||
        json.results.find(
          (video) => video.type === "Teaser" && video.site === "YouTube"
        );

      if (trailer) {
        dispatch(addtrailerVideo(trailer));
      } else {
        console.log("❌ No trailer/teaser found");
      }
    } catch (err) {
      console.error("❌ Error fetching trailer:", err);
    }
  };

  useEffect(() => {
    if (movieId) getMovieVideo();
  }, [movieId]);
};

export default useMovieTrailer;