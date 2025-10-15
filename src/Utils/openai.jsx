// src/Utils/openai.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_KEY,
  dangerouslyAllowBrowser: true, // ⚠️ works for frontend-only, but not for production
});

export default openai;
