import { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup, 
        GoogleAuthProvider, 
        signOut, 
        onAuthStateChanged,
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword 
      } from "firebase/auth";
import { auth } from "../firebase"; // проверь правильность пути к твоему файлу firebase.js

// 1. Создаем сам контекст
const AuthContext = createContext();

// 2. Создаем компонент-обертку (Провайдер)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Добавляем статус загрузки

  // Функция входа
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  // Функция выхода
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  // Функция РЕГИСТРАЦИИ по почте и паролю
  const registerWithEmail = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Firebase автоматически авторизует пользователя после успешной регистрации,
      // так что onAuthStateChanged сработает сам!
    } catch (error) {
      console.error("Ошибка при регистрации:", error.message);
      throw error; // Пробрасываем ошибку, чтобы показать ее в интерфейсе (например, "пароль слишком короткий")
    }
  };

  // Функция ВХОДА по почте и паролю
  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Ошибка при входе:", error.message);
      throw error; // Пробрасываем ошибку (например, "неверный пароль")
    }
  };

  // Тот самый useEffect выносим сюда
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Как только Firebase ответил, убираем загрузку
    });
    return () => unsubscribe();
  }, []);

  // Передаем стейт и функции вниз по дереву
  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, loading, registerWithEmail, loginWithEmail   }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

// 3. Создаем удобный кастомный хук для использования в компонентах
export const useAuth = () => {
  return useContext(AuthContext);
};