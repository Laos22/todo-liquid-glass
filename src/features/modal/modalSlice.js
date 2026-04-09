import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        show: false,
        editId: null
    },
    reducers: {
        openModal: state => {
            state.show = true
            state.editId = null},
        closeModal: state => {state.show = false},
    }
})

export const {openModal, closeModal, openModalEdit} = modalSlice.actions;
export default modalSlice.reducer;