
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '../features/sideBar/sideBarSlice';
import { useAuth } from '../context/AuthContext.jsx';



const Header = () => {
    const collapsed = useSelector((state) => state.sideBar);
    const dispatch = useDispatch();
    const { user } = useAuth();
  return (
    <header className="h-16 flex items-center justify-between px-4 bg-gray-200 border-b shrink-0">
        <nav className="flex items-center">
            <button
            onClick={() => dispatch(toggleSideBar())}
            className="p-2 rounded hover:bg-white/50 transition mx-2 flex items-center justify-center"
            >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-7 h-7 text-blue-800" // Цвет берем такой же, как у заголовка
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            </button>
            <h2 className="text-xl font-bold text-blue-800 whitespace-nowrap mx-2">LiquidGlass Tasks</h2>
        </nav>
        <div className="">
            {user && <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full mr-3" />}
        </div>
    </header>
  )
}

export default Header