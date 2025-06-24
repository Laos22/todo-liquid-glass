import { createSlice } from '@reduxjs/toolkit';

const saved = localStorage.getItem('tasks');
const initialState = saved ? JSON.parse(saved): [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (tasks, action) => {
      tasks.push(action.payload);
    },
    removeTask: (tasks, action) => {
      console.log("del: " + action.payload)
      return tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;