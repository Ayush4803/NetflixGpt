import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { addUpcoming } from "../Utils/movieSlice";

const useUpcoming = () => {
  const dispatch = useDispatch();

  const getUpcoming = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();

      dispatch(addUpcoming(json.results)); // ✅ dispatch to Redux slice
    } catch (error) {
      console.error("❌ Fetch failed:", error);
    }
  };

  useEffect(() => {
    getUpcoming();
  }, []);
};

export default useUpcoming;