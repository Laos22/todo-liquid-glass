import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem('sideBar');

const sideBarSlice = createSlice({
    name: "sideBar",
    initialState: saved ? JSON.parse(saved) : false,
    reducers: {
        // state here is a primitive boolean. Immer allows returning
        // a new primitive value — so return the toggled boolean.
        toggleSideBar: (state) => {
            return !state;
        }
    }
});

export const { toggleSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;