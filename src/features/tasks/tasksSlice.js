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
    toggleCheckedTask: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.checked = !task.checked;
      }
    },
    editTask: (tasks, action) => {
      console.log("edit: " + action.payload.id)
      // const {id, title, description, dueDate} =action
      return tasks.map(task =>
        task.id === action.payload.id ? {...task, ...action.payload} : task
      );
    }
  },
});

export const { addTask, removeTask, editTask, toggleCheckedTask } = tasksSlice.actions;
export default tasksSlice.reducer;