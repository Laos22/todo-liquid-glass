import { CalendarDays, CalendarClock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
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
      className="bg-white/30 backdrop-blur-md shadow-md p-4 flex flex-col"
    >
      <ul className="space-y-3 animate-[fade] whitespace-nowrap flex-1">
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
        className="mt-auto w-full p-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
      >
        {collapsed ? "x" : 'Выйти'}
      </button>
    </motion.aside>
  );
}
