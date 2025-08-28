import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: { nowPlayingMovies: null,trailerVideo:null },
  reducers: {
    addnowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addtrailerVideo:(state,action)=>{
      state.trailerVideo=action.payload;
    }
  },
});

export const { addnowPlayingMovies,addtrailerVideo } = movieSlice.actions; // ✅ FIXED
export default movieSlice.reducer;
