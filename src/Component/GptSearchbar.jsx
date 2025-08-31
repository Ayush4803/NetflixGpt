import openai from "../Utils/openai";
import React, { useState, useRef } from "react";
import lang from "../Utils/languageConstant";
import { API_OPTIONS, IMG_CDN_URL } from "../Utils/constant";
import Footer from "./Footer"

const GptSearchbar = () => {
  const [selectedLang, setSelectedLang] = useState("en");
  const [movieInfo, setMovieInfo] = useState(null);
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

  // Search movie on TMDB
  const searchMovieTMDB = async (query) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const data = await res.json();
    return data.results?.[0] || null; // pick first match
  };

  // Get Netflix availability from TMDB watch/providers
  const checkNetflixAvailability = async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
      API_OPTIONS
    );
    const data = await res.json();
    return data.results?.IN?.flatrate?.some((p) => p.provider_name === "Netflix") || false;
  };

  const handleGptSearchClick = async () => {
    if (!searchText.current.value) return;
    if (isWaiting) {
      alert(`Please wait ${cooldown / 1000}s before the next search.`);
      return;
    }

    isWaiting = true;
    setLoading(true);
    setTimeout(() => {
      isWaiting = false;
    }, cooldown);

    try {
      // 1️⃣ Ask GPT for movie details (description & cast mainly)
      const gptResults = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that returns movie details in JSON format only."
          },
          {
            role: "user",
            content: `Give me details about the movie "${searchText.current.value}". 
                      Return JSON with keys: description, cast (list).`
          },
        ],
      });

      const resultText = gptResults.choices?.[0]?.message?.content;
      const gptData = safeJSONParse(resultText);

      if (!gptData) {
        alert("Failed to parse GPT response. Try a different movie name.");
        setMovieInfo(null);
        setLoading(false);
        return;
      }

      // 2️⃣ Search TMDB for official info (poster, release date, IMDb rating)
      const tmdbData = await searchMovieTMDB(searchText.current.value);

      if (!tmdbData) {
        alert("Movie not found on TMDB.");
        setMovieInfo(null);
        setLoading(false);
        return;
      }

      const netflixAvailable = await checkNetflixAvailability(tmdbData.id);

      setMovieInfo({
        title: tmdbData.title,
        releaseDate: tmdbData.release_date,
        imdbRating: tmdbData.vote_average,
        posterUrl: IMG_CDN_URL + tmdbData.poster_path,
        availableOnNetflix: netflixAvailable,
        description: gptData.description || tmdbData.overview,
        cast: gptData.cast || [],
      });
    } catch (error) {
      if (error.status === 429) {
        cooldown = Math.min(cooldown * 2, 60000);
        alert(`Rate limit hit! Next wait time increased to ${cooldown / 1000}s`);
      } else {
        console.error(error);
        alert("An error occurred while fetching movie details.");
      }
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
          <option key={key} value={key} className="text-black">
            {key.toUpperCase()}
          </option>
        ))}
      </select>

      <form onSubmit={(e) => e.preventDefault()} className="w-1/2 bg-black grid grid-cols-12">
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

      {movieInfo && (
  <div className="mt-6 w-full max-w-md bg-gray-900 text-white p-4 rounded-lg shadow-lg flex flex-col items-center mx-auto">
    <h2 className="text-2xl font-bold mb-3 text-center">{movieInfo.title} ({movieInfo.releaseDate})</h2>
    
    {movieInfo.posterUrl && (
      <img
        src={movieInfo.posterUrl}
        alt={movieInfo.title}
        className="w-40 mb-4 rounded shadow-lg mx-auto"
      />
    )}

    <p className="mb-1 text-center text-sm"><span className="font-bold">Description:</span> {movieInfo.description}</p>
    <p className="mb-1 text-center text-sm"><span className="font-bold">Cast:</span> {Array.isArray(movieInfo.cast) ? movieInfo.cast.join(", ") : movieInfo.cast}</p>
    <p className="mb-2 text-center text-sm"><span className="font-bold">IMDb Rating:</span> ⭐ {movieInfo.imdbRating}</p>

    {/* Netflix availability with color badge */}
    <p className={`mt-3 px-3 py-1 rounded-full font-semibold text-sm 
                   ${movieInfo.availableOnNetflix ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
      {movieInfo.availableOnNetflix ? "Available on Netflix ✅" : "Not on Netflix ❌"}
    </p>
  </div>
)}



    </div>

    
  );
};

export default GptSearchbar;
