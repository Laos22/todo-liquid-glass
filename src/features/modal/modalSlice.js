import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        show: false
    },
    reducers: {
        openModal: state => {state.show = true},
        closeModal: state => {state.show = false},
        toggleModal: state => {state.show = !state.show}
    }
})

export const {openModal, closeModal, toggleModal} = modalSlice.actions;
export default modalSlice.reducer;