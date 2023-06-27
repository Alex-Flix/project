import { createSlice } from "@reduxjs/toolkit";


const favLoaderSlice=createSlice({
    name: "loader",
    initialState:false,
    reducers:{
        setFavLoader(state, action){
            return state= action.payload
        }
    }

})

export const {setFavLoader}=favLoaderSlice.actions
export default favLoaderSlice.reducer