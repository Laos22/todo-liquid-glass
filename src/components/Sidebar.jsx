import { CalendarDays, CalendarClock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '../features/sideBar/sideBarSlice';
import { setFilter } from '../features/filter/filterSlice';

export default function Sidebar() {
  const collapsed = useSelector((state) => state.sideBar);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

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
      className="bg-white/30 backdrop-blur-md shadow-md p-4 h-screen overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6">
        {!collapsed && <h2 className="text-xl font-bold text-gray-800">Меню</h2>}
        <button
          onClick={() => dispatch(toggleSideBar())}
          className="p-1 rounded hover:bg-white/50 transition"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
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
    </motion.aside>
  );
}

