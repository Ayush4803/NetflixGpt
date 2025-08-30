import {createSlice} from "@reduxjs/toolkit";

const gptSlice= createSlice(
    {
        name:"gpt",
        initialState:{
            showGptSearch:false
        },
        reducer:{
            toggleGptSearchView:(state,action)=>{
                state.showGptSerach=!stateshowGptSearch
            },
        },
    },
);


export const {toggleGptSearchView}= gptSlice.actions;
export default gptSlice.reducer;