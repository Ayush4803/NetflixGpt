import OpenAI from "openai";
import { OPENAI_KEY } from "./constant"; // store both in env/constants

const openai = new OpenAI({
  apiKey: OPENAI_KEY, 
//   project: OPENAI_PROJECT,  // required for sk-proj- keys
  dangerouslyAllowBrowser: true, // ⚠️ frontend only, unsafe in production
});

export default openai;
