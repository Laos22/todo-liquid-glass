import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem('sideBar');

const sideBarSlice = createSlice({
    name: "sideBar",
    initialState: saved ? JSON.parse(saved): false,
    reducers: {
        toggleSideBar: (prev => !prev)
    }
})

export const {toggleSideBar} = sideBarSlice.actions;

export default sideBarSlice.reducer;