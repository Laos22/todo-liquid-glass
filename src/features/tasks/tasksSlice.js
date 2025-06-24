import { createSlice } from '@reduxjs/toolkit';

const saved = localStorage.getItem('tasks');
const initialState = saved ? JSON.parse(saved): [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    removeTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;