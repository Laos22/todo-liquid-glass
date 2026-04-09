
import {useAuth} from '../context/AuthContext.jsx';
import { useState } from 'react';

const AuthCard = () => {
    const { loginWithGoogle, registerWithEmail, loginWithEmail } = useAuth();
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLoginMode) {
                await loginWithEmail(email, password);
            } else {
                await registerWithEmail(email, password);
            }
        } catch (err) {
            setError(err.message);
        }
    }
   
    

  return (          
    <div className='flex justify-center items-center min-h-screen bg-gray-500 border border-gray-300'>
        {!showEmailForm ? (
            <div className='w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border border-white/20'>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">
                Привет! 👋
                </h2>
                <p className="text-slate-600 mb-8">
                Для продолжения нужно зарегистрироваться!
                </p>
                <div className='space-y-4'>
                <button 
                    onClick={loginWithGoogle}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                >
                    <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
                    Войти через Google
                </button>
                <button 
                    onClick={() => {
                        setShowEmailForm(true);
                        setIsLoginMode(false);
                    }}  
                    className="w-full bg-slate-900 text-white font-semibold py-3 px-4 rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                >
                    Регистрация через почту
                </button>
                <button 
                    className="w-full bg-slate-900 text-white font-semibold py-3 px-4 rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                >
                    Попробовать без регистрации
                </button>
                </div>
                {/* Разделитель */}
                <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">Или</span></div>
                </div>

                <p className="text-sm text-slate-500">
                Уже есть аккаунт? <span 
                    onClick={() => {
                        setShowEmailForm(true);
                        setIsLoginMode(true);
                    }}
                    className="text-indigo-600 font-bold cursor-pointer hover:underline">Войти</span>
                </p>
            </div>
        ) : (
            <form onSubmit={handleEmailAuth} className='w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border border-white/20'>
                <h2 className="text-2xl font-extrabold text-slate-800 mb-6">
                {isLoginMode ? 'Вход' : 'Регистрация'}
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input 
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-6 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200"
                >
                    {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
                </button>
                <p className="mt-4 text-sm text-slate-500">
                    {isLoginMode ? "Нет аккаунта?" : "Уже есть аккаунт?"} {' '}
                    <span 
                        onClick={() => setIsLoginMode(!isLoginMode)}
                        className="text-indigo-600 font-bold cursor-pointer hover:underline"
                    >
                        {isLoginMode ? 'Создать' : 'Войти'}
                    </span>
                </p>
                <button 
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="w-full mt-4 bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-400 transition-all active:scale-95 shadow-sm"
                >
                    Назад
                </button>
            </form>
        )}
        </div>
    )
}

export default AuthCard;
