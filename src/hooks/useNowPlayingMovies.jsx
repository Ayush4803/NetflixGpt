import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { addnowPlayingMovies } from "../Utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addnowPlayingMovies(json.results));
      // console.log("Fetched Movies:", json.results);
    } catch (error) {
      console.error("❌ Fetch failed:", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []); // runs only once on mount
};

export default useNowPlayingMovies;