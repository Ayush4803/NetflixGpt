import openai from "../Utils/openai";
import React, { useState, useRef } from "react";
import lang from "../Utils/languageConstant";
import { API_OPTIONS, IMG_CDN_URL } from "../Utils/constant";

const GptSearchbar = () => {
  const [selectedLang, setSelectedLang] = useState("en");
  const [moviesInfo, setMoviesInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchText = useRef(null);

  let isWaiting = false;
  let cooldown = 5000;

  // Safe JSON parser for GPT responses
  const safeJSONParse = (text) => {
    try {
      const cleaned = text.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse GPT JSON:", err, "\nOriginal text:", text);
      return null;
    }
  };

  // TMDB search
  const searchMovieTMDB = async (query) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
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
        `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
        API_OPTIONS
      );
      const data = await res.json();
      return data.results?.IN?.flatrate?.some((p) => p.provider_name === "Netflix") || false;
    } catch (err) {
      console.error("Netflix check failed:", err);
      return false;
    }
  };

  // Detect genre or top movie search
  const isGenreSearch = (query) => {
  const genreKeywords = [
    "top", "best", "imdb", "horror", "comedy", "documentary",
    "action", "romantic", "drama", "thriller", "sci-fi",
    "emotional", "retro", "ww2", "for kids", "anime","motivational"
  ];
  return genreKeywords.some((word) => query.toLowerCase().includes(word));
};


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
        // Top 5 movies by genre or keyword search via GPT
        const gptResults = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a movie recommendation system. Return JSON only." },
            { role: "user", content: `Suggest top 10 movies for "${query}". Return JSON array: [{"title": ""}]` }
          ],
        });

        const gptData = safeJSONParse(gptResults.choices?.[0]?.message?.content) || [];
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
        // Single movie search with description
        const tmdbData = await searchMovieTMDB(query);
        if (!tmdbData) {
          alert("Movie not found on TMDB.");
          setMoviesInfo([]);
          return;
        }
        const netflixAvailable = await checkNetflixAvailability(tmdbData.id);

        // Optionally, GPT for cast
        const gptCastResult = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant. Return JSON only." },
            { role: "user", content: `Provide main cast for the movie "${tmdbData.title}". Return JSON: {"cast": []}` }
          ],
        });

        const gptCast = safeJSONParse(gptCastResult.choices?.[0]?.message?.content)?.cast || [];

        results.push({
          title: tmdbData.title,
          releaseDate: tmdbData.release_date,
          imdbRating: tmdbData.vote_average,
          posterUrl: IMG_CDN_URL + tmdbData.poster_path,
          availableOnNetflix: netflixAvailable,
          description: tmdbData.overview,
          cast: gptCast,
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
      <select
        className="mb-8 p-2 rounded text-white font-semibold"
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
      >
        {Object.keys(lang).map((key) => (
          <option key={key} value={key} className="text-black">{key.toUpperCase()}</option>
        ))}
      </select>

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
    <img
      src={moviesInfo[0].posterUrl}
      alt={moviesInfo[0].title}
      className="w-40 h-auto rounded mb-4"
    />
    <p className="text-sm mb-1 text-center line-clamp-3">{moviesInfo[0].description}</p>
    {moviesInfo[0].cast?.length > 0 && <p className="text-xs mb-1 text-center">Cast: {moviesInfo[0].cast.join(", ")}</p>}
    <p className="text-xs mb-1">IMDb: ⭐ {moviesInfo[0].imdbRating}</p>
    <p className="text-xs mb-2">Release: {moviesInfo[0].releaseDate}</p>
    <p className={`text-xs px-2 py-1 rounded text-center ${moviesInfo[0].availableOnNetflix ? 'bg-green-600' : 'bg-red-600'}`}>
      {moviesInfo[0].availableOnNetflix ? "Netflix ✅" : "Not Netflix ❌"}
    </p>
  </div>
)}

{/* Horizontal scroll container for multiple movies */}
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
