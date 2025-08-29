import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { addtopRated } from "../Utils/movieSlice";

const useTopRated = () => {
  const dispatch = useDispatch();

  const getTopRated = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();

      dispatch(addtopRated(json.results)); // ✅ dispatch to Redux slice
    } catch (error) {
      console.error("❌ Fetch failed:", error);
    }
  };

  useEffect(() => {
    getTopRated();
  }, []);
};

export default useTopRated;
