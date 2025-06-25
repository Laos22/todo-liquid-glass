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
    editTask: (tasks, action) => {
      console.log("edit: " + action.payload.id)
      return tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
    }
  },
});

export const { addTask, removeTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;