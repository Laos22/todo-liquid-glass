// Импортируем главную функцию для инициализации
import { initializeApp } from "firebase/app";

// Импортируем нужные нам сервисы: авторизацию и базу данных
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Сюда вставь свои данные из настроек Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDoUTyXbxi9IKL4JVs7iRIlWmieNMIgWRs",
  authDomain: "todo-339ac.firebaseapp.com",
  projectId: "todo-339ac",
  storageBucket: "todo-339ac.firebasestorage.app",
  messagingSenderId: "864656255926",
  appId: "1:864656255926:web:49e670e6e8be43fe176f17"
};

// Инициализируем само приложение Firebase
const app = initializeApp(firebaseConfig);

// Получаем доступ к авторизации и базе данных
export const auth = getAuth(app);
export const db = getFirestore(app);