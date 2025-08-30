import React, { useState } from "react";
import lang from "../Utils/languageConstant";

const GptSearchbar = () => {
  const [selectedLang, setSelectedLang] = useState("en"); // default language

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
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 col-span-9 rounded-l-lg placeholder-white"
          placeholder={lang[selectedLang].gptSearchPlaceholder}
        />
        <button
          type="submit"
          className="col-span-3 m-4 py-2 px-4 bg-red-600 text-white rounded-r-lg cursor-pointer"
        >
          {lang[selectedLang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchbar;
