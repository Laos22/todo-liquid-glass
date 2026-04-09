import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addTaskToDB, getUserTasksFromDB, updateTaskInDB, deleteTaskFromDB } from '../../services/taskService';

// const saved = localStorage.getItem('tasks');
const initialState = [];


export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  // Принимаем весь объект задачи из формы
  async (taskData) => { 
    const newTask = await addTaskToDB(taskData);
    return newTask;
  }
);

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (userId) => {
    // Идем в базу и просим все задачи этого юзера
    const tasks = await getUserTasksFromDB(userId);
    return tasks; // Возвращаем массив задач
  }
);

export const removeTaskDB = createAsyncThunk(
  'tasks/removeTaskDB',
  async (taskId) => {
    // Говорим базе данных удалить документ с этим ID
    await deleteTaskFromDB(taskId);
    // Возвращаем ID обратно в слайс, чтобы знать, что вырезать из массива
    return taskId; 
  }
);

export const toggleTaskStatusDB = createAsyncThunk(
  'tasks/toggleTaskStatusDB',
  async ({ taskId, currentStatus }) => {
    const newStatus = !currentStatus;
    // Обновляем в Firebase только одно поле
    await updateTaskInDB(taskId, { checked: newStatus });
    // Возвращаем данные, чтобы обновить Redux
    return { taskId, checked: newStatus };
  }
);

export const updateTaskDetailsDB = createAsyncThunk(
  'tasks/updateTaskDetailsDB',
  async ({ taskId, updatedData }) => {
    // updatedData — это объект, например: { title: "Новое имя", description: "Новое описание" }
    await updateTaskInDB(taskId, updatedData);
    return { taskId, updatedData };
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(addNewTask.fulfilled, (state, action) => {
      // Когда Firebase скажет "Успешно", мы просто пушим задачу в массив
      state.push(action.payload); 
    })
    .addCase(fetchTasks.fulfilled, (state, action) => {
        // Мы берем пустой массив стейта и ЗАМЕНЯЕМ его на массив с сервера (action.payload)
        return action.payload; 
      })
    .addCase(removeTaskDB.fulfilled, (state, action) => {
        // Мы фильтруем массив: оставляем все задачи, КРОМЕ той, ID которой пришел в action.payload
        return state.filter(task => task.id !== action.payload);
      })
    .addCase(toggleTaskStatusDB.fulfilled, (state, action) => {
      const { taskId, checked } = action.payload;
      // Находим задачу в массиве и меняем ей статус
      const task = state.find(t => t.id === taskId);
      if (task) {
        task.checked = checked;
      }
    })
    .addCase(updateTaskDetailsDB.fulfilled, (state, action) => {
    const { taskId, updatedData } = action.payload;
    const index = state.findIndex(t => t.id === taskId);
    if (index !== -1) {
      // Склеиваем старые данные задачи с новыми
      state[index] = { ...state[index], ...updatedData };
    }
  });
  }
});

export const { addTask, removeTask, editTask, toggleCheckedTask } = tasksSlice.actions;
export default tasksSlice.reducer;