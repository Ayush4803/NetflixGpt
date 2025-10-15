import React, { useState, useRef } from "react";
import lang from "../Utils/languageConstant";
import { API_OPTIONS, IMG_CDN_URL } from "../Utils/constant";

// Genre-to-movie mapping (mock GPT responses)
const genreMovies = {
  ww2: [
    "Saving Private Ryan",
    "Dunkirk",
    "Schindler's List",
    "The Pianist",
    "Fury",
    "Letters from Iwo Jima",
    "The Thin Red Line",
    "Hacksaw Ridge",
    "Enemy at the Gates",
    "Life is Beautiful",
    "Midway",
    "Patton",
    "A Bridge Too Far",
    "The Great Escape",
    "Jojo Rabbit"
  ],
  horror: [
    "The Conjuring",
    "Insidious",
    "It",
    "Hereditary",
    "A Nightmare on Elm Street",
    "The Exorcist",
    "Get Out",
    "Halloween",
    "Paranormal Activity",
    "Saw",
    "Friday the 13th"
  ],
  comedy: [
    "The Hangover",
    "Superbad",
    "Step Brothers",
    "Anchorman",
    "Dumb and Dumber",
    "Ferris Bueller's Day Off",
    "Groundhog Day",
    "Bridesmaids",
    "Mean Girls",
    "21 Jump Street"
  ],
  // Add more genres as needed
};

const GptSearchbar = () => {
  const [selectedLang, setSelectedLang] = useState("en");
  const [moviesInfo, setMoviesInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchText = useRef(null);

  let isWaiting = false;
  let cooldown = 5000;

  // TMDB search
  const searchMovieTMDB = async (query) => {
    try {
      const res = await fetch(
        `https://corsproxy.io/https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      if (!res.ok) throw new Error("TMDB fetch failed");
      const data = await res.json();
      return data.results?.[0] || null;
    } catch (err) {
      console.error("TMDB fetch error:", err, query);
      return null;
    }
  };

  // Netflix availability check
  const checkNetflixAvailability = async (movieId) => {
    try {
      const res = await fetch(
        `https://corsproxy.io/https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
        API_OPTIONS
      );
      const data = await res.json();
      return data.results?.IN?.flatrate?.some((p) => p.provider_name === "Netflix") || false;
    } catch (err) {
      console.error("Netflix check failed:", err);
      return false;
    }
  };

  // Detect genre search
  const isGenreSearch = (query) => {
    return Object.keys(genreMovies).some((genre) => query.toLowerCase().includes(genre));
  };

  // Mock GPT response using genreMovies
  const mockGptResponse = (query) => {
    const genreKey = Object.keys(genreMovies).find((genre) =>
      query.toLowerCase().includes(genre)
    );
    if (!genreKey) return [];
    return genreMovies[genreKey].slice(0, 15).map((title) => ({ title }));
  };

  // Search handler
  const handleGptSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query) return;
    if (isWaiting) {
      alert(`Please wait ${cooldown / 1000}s before the next search.`);
      return;
    }

    isWaiting = true;
    setLoading(true);
    setTimeout(() => { isWaiting = false; }, cooldown);

    try {
      const genreSearch = isGenreSearch(query);
      let results = [];

      if (genreSearch) {
        const gptData = mockGptResponse(query); // genre-based movie titles
        for (const movie of gptData) {
          const tmdbData = await searchMovieTMDB(movie.title);
          if (!tmdbData) continue;
          const netflixAvailable = await checkNetflixAvailability(tmdbData.id);
          results.push({
            title: tmdbData.title,
            releaseDate: tmdbData.release_date,
            imdbRating: tmdbData.vote_average,
            posterUrl: IMG_CDN_URL + tmdbData.poster_path,
            availableOnNetflix: netflixAvailable,
          });
        }
      } else {
        const tmdbData = await searchMovieTMDB(query);
        if (!tmdbData) {
          alert("Movie not found on TMDB.");
          setMoviesInfo([]);
          setLoading(false);
          return;
        }
        const netflixAvailable = await checkNetflixAvailability(tmdbData.id);
        results.push({
          title: tmdbData.title,
          releaseDate: tmdbData.release_date,
          imdbRating: tmdbData.vote_average,
          posterUrl: IMG_CDN_URL + tmdbData.poster_path,
          availableOnNetflix: netflixAvailable,
          description: tmdbData.overview,
          cast: ["Actor 1", "Actor 2", "Actor 3"], // mocked cast
        });
      }

      setMoviesInfo(results);
    } catch (err) {
      console.error(err);
      alert("Error fetching movie data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[5%] flex flex-col items-center">
      {/* Language selector */}
      <select
        className="mb-8 p-2 rounded text-white font-semibold"
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
      >
        {Object.keys(lang).map((key) => (
          <option key={key} value={key} className="text-black">{key.toUpperCase()}</option>
        ))}
      </select>

      {/* Search bar */}
      <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-1/2 bg-black grid grid-cols-12">
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 rounded-l-lg placeholder-white"
          placeholder={lang[selectedLang].gptSearchPlaceholder}
        />
        <button
          type="submit"
          onClick={handleGptSearchClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-600 text-white rounded-r-lg cursor-pointer"
        >
          {loading ? "Searching..." : lang[selectedLang].search}
        </button>
      </form>

      {/* Single movie result */}
      {moviesInfo.length === 1 && (
        <div className="mt-6 w-full max-w-md bg-gray-900 text-white p-4 rounded-lg shadow-lg mx-auto flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-3 text-center">{moviesInfo[0].title} ({moviesInfo[0].releaseDate})</h2>
          <img src={moviesInfo[0].posterUrl} alt={moviesInfo[0].title} className="w-40 h-auto rounded mb-4" />
          <p className="text-sm mb-1 text-center line-clamp-3">{moviesInfo[0].description}</p>
          {moviesInfo[0].cast?.length > 0 && <p className="text-xs mb-1 text-center">Cast: {moviesInfo[0].cast.join(", ")}</p>}
          <p className="text-xs mb-1">IMDb: ⭐ {moviesInfo[0].imdbRating}</p>
          <p className="text-xs mb-2">Release: {moviesInfo[0].releaseDate}</p>
          <p className={`text-xs px-2 py-1 rounded text-center ${moviesInfo[0].availableOnNetflix ? 'bg-green-600' : 'bg-red-600'}`}>
            {moviesInfo[0].availableOnNetflix ? "Netflix ✅" : "Not Netflix ❌"}
          </p>
        </div>
      )}

      {/* Multiple movies */}
      {moviesInfo.length > 1 && (
        <div className="mt-6 w-full overflow-x-auto flex space-x-4 px-4">
          {moviesInfo.map((movie, idx) => (
            <div
              key={idx}
              className="min-w-[180px] bg-gray-900 text-white p-2 rounded-lg flex-shrink-0 cursor-pointer
                         transform transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            >
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-48 object-cover rounded mb-2"/>
              <h3 className="text-sm font-bold cursor-pointer">{movie.title}</h3>
              <p className="text-xs mb-1 cursor-pointer">IMDb: ⭐ {movie.imdbRating}</p>
              <p className="text-xs mb-1 cursor-pointer">Release: {movie.releaseDate}</p>
              <p className={`text-xs px-1 py-0.5 rounded text-center ${movie.availableOnNetflix ? 'bg-green-600' : 'bg-red-600'}`}>
                {movie.availableOnNetflix ? "Netflix ✅" : "Not Netflix ❌"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GptSearchbar;
