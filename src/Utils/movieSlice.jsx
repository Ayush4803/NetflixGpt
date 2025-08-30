import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: { 
    nowPlayingMovies: null, 
    popularMovies: null,   // added popularMovies
    trailerVideo: null,
    topRated:null,
    Upcoming:null
  },
  reducers: {
    addnowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;  // correctly store popular movies
    },
     addtopRated: (state, action) => {
      state.topRated = action.payload;  // correctly store popular movies
    },
    addUpcoming: (state, action) => {
      state.Upcoming = action.payload;  // correctly store popular movies
    },
    addtrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});

export const { addnowPlayingMovies, addtrailerVideo, addPopularMovies,addtopRated,addUpcoming } = movieSlice.actions;
export default movieSlice.reducer;