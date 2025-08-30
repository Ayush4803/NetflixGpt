import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { addPopularMovies } from "../Utils/movieSlice"; // ✅ use correct action

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      const data = await fetch(
        "https://corsproxy.io/https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();

      dispatch(addPopularMovies(json.results)); // ✅ dispatch popular movies here
    } catch (error) {
      console.error("❌ Fetch failed:", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;