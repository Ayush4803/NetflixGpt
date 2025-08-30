import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false, // ✅ correct key
  },
  reducers: { // ✅ should be plural
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch; // ✅ fix typos
    },
  },
});

export const { toggleGptSearchView } = gptSlice.actions;
export default gptSlice.reducer;