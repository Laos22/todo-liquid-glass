// Импортируем нашу базу данных
import { db } from "../firebase";
// Импортируем нужные функции из библиотеки Firestore
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where 
} from "firebase/firestore";

// Название нашей коллекции в базе
const TASKS_COLLECTION = "tasks";


export const addTaskToDB = async (taskData) => {
  try {
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), taskData);
    // Возвращаем объект обратно, добавив к нему сгенерированный Firebase ID
    return { id: docRef.id, ...taskData }; 
  } catch (error) {
    console.error("Ошибка при добавлении задачи: ", error);
  }
};

export const getUserTasksFromDB = async (userId) => {
  try {
    // Создаем запрос: "Дай мне из 'tasks' те документы, где userId равен ID текущего юзера"
    const q = query(
      collection(db, TASKS_COLLECTION), 
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    
    // Firestore возвращает странный объект, его нужно перебрать и превратить в обычный массив
    const tasks = [];
    querySnapshot.forEach((doc) => {
      // doc.id - это ID документа, doc.data() - это сами данные (text, completed и тд)
      tasks.push({ id: doc.id, ...doc.data() });
    });

    return tasks; // Возвращаем готовый массив задач
  } catch (error) {
    console.error("Ошибка при получении задач: ", error);
    return [];
  }
};

export const updateTaskInDB = async (taskId, updatedFields) => {
  try {
    // Находим конкретный документ по его ID
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    
    // Обновляем только те поля, которые передали
    await updateDoc(taskRef, updatedFields);
  } catch (error) {
    console.error("Ошибка при обновлении задачи: ", error);
  }
};

export const deleteTaskFromDB = async (taskId) => {
  try {
    // Находим конкретный документ по его ID и удаляем
    const taskRef = doc(db, TASKS_COLLECTION, taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Ошибка при удалении задачи: ", error);
  }
};