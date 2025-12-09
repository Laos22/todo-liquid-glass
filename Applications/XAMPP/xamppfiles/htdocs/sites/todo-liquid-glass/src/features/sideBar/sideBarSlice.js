import { createSlice } from "@reduxjs/toolkit";

const saved = localStorage.getItem('sideBar');

const sideBarSlice = createSlice({
    name: "sideBar",
    initialState: saved ? JSON.parse(saved): {collapsed: false, filter: 'all'},
    reducers: {
        toggleSideBar: (state => {state.collapsed = !state.collapsed}),
        setFilter: (state, action) => {state.filter = action.payload}
    }
})

export const {toggleSideBar, setFilter} = sideBarSlice.actions;

export default sideBarSlice.reducer;