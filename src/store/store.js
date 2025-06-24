import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import modalReducer from '../features/modal/modalSlice';
import sideBarReduser from '../features/sideBar/sideBarSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    modal: modalReducer,
    sideBar: sideBarReduser
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('tasks', JSON.stringify(state.tasks))
  localStorage.setItem('sideBar', JSON.stringify(state.sideBar))
})