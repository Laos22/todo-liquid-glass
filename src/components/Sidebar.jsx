import { CalendarDays, CalendarClock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/filter/filterSlice';
import { useAuth } from '../context/AuthContext.jsx';

export default function Sidebar() {
  const collapsed = useSelector((state) => state.sideBar);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const {logout } = useAuth();


  const items = [
    { key: 'all', label: 'Все задачи', Icon: CalendarDays },
    { key: 'active', label: 'Активные', Icon: CalendarClock },
    { key: 'completed', label: 'Выполненные', Icon: CheckCircle },
  ];
  return (
    <aside
    
      className={`bg-gray-200/30 backdrop-blur-md shadow-md 
                  transition-all duration-300 overflow-hidden
                  ${collapsed ? "w-0 border-r-0" : "w-full md:w-64"}
                  `
      }
    >
      <div className="h-full w-64 flex flex-col justify-center p-4 border-b shrink-0">
        <ul className="space-y-3 animate-[fade] whitespace-nowrap flex-1">
          {items.map(({ key, label, Icon }) => (
            <li key={key}>
              <button
                type="button"
                onClick={() => dispatch(setFilter(key))}
                className={`flex items-center w-full text-left ${filter === key ? 'text-blue-700 font-semibold' : 'text-gray-700 hover:text-black'}`}
              >
                <Icon className="mr-2" size={18} />
                {label}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={logout}
          className="mt-auto w-full p-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
        >
        Выйти
        </button>
      </div>
    </aside>
  );
}
