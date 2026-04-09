import { CalendarDays, CalendarClock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '../features/sideBar/sideBarSlice';
import { setFilter } from '../features/filter/filterSlice';
import { useAuth } from '../context/AuthContext.jsx';

export default function Sidebar() {
  const collapsed = useSelector((state) => state.sideBar);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { user, logout } = useAuth();


  const items = [
    { key: 'all', label: 'Все задачи', Icon: CalendarDays },
    { key: 'active', label: 'Активные', Icon: CalendarClock },
    { key: 'completed', label: 'Выполненные', Icon: CheckCircle },
  ];
  return (
    <motion.aside
      initial={{ width: collapsed ? 64 : 256 }}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3 }}
      className="bg-white/30 backdrop-blur-md shadow-md p-4 h-screen overflow-hidden flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        {!collapsed && <h2 className="text-xl font-bold text-blue-800 whitespace-nowrap">LiquidGlass Tasks</h2>}
        <button
          onClick={() => dispatch(toggleSideBar())}
          className="p-1 rounded hover:bg-white/50 transition"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        {user && <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full mr-3" />}
      </div>
      <ul className="space-y-3 animate-[fade]">
        {items.map(({ key, label, Icon }) => (
          <li key={key}>
            <button
              type="button"
              onClick={() => dispatch(setFilter(key))}
              className={`flex items-center w-full text-left ${filter === key ? 'text-blue-700 font-semibold' : 'text-gray-700 hover:text-black'}`}
            >
              <Icon className="mr-2" size={18} />
              {!collapsed && label}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={logout}
        className="mt-auto w-full py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600 transition"
      >
        Выйти
      </button>
    </motion.aside>
  );
}
