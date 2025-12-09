import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import modalReducer from "../features/modal/modalSlice";
import sideBarReducer from "../features/sideBar/sideBarSlice";
import filterReducer from "../features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    modal: modalReducer,
    sideBar: sideBarReducer,
    filter: filterReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
  localStorage.setItem("sideBar", JSON.stringify(state.sideBar));
});
