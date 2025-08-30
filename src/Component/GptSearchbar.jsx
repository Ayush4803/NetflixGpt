import openai from "../Utils/openai"
import React, { useState, useRef } from "react";
import lang from "../Utils/languageConstant";

const GptSearchbar = () => {
  const [selectedLang, setSelectedLang] = useState("en"); // default language
  const searchText = useRef(null);

  let isWaiting = false;
  let cooldown = 5000; // start with 5s

  const handleGptSearchClick = async () => {
    if (isWaiting) {
      alert(`Please wait ${cooldown / 1000}s before the next search.`);
      return;
    }
    isWaiting = true;
    setTimeout(() => { isWaiting = false }, cooldown);

    try {
      const gptResults = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: searchText.current.value }
        ]
      });
      console.log(gptResults.choices[0].message.content);
    } catch (error) {
      if (error.status === 429) {
        // Auto increase cooldown when hitting rate limit
        cooldown = Math.min(cooldown * 2, 60000); // max 60s
        alert(`Rate limit hit! Next wait time increased to ${cooldown / 1000}s`);
      } else {
        console.error(error);
      }
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
          <option key={key} value={key} className="text-black">
            {key.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Search form */}
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
          {lang[selectedLang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchbar;
