import { CalendarDays, CalendarClock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '../features/sideBar/sideBarSlice';

export default function Sidebar() {
  const collapsed = useSelector(state => state.sideBar);
  const dispatch = useDispatch();

  // console.log("render Sidebar")
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
        <li>
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-black"
          >
            <CalendarDays className="mr-2" size={18} />
            {!collapsed && 'Сегодня'}
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center text-gray-700 hover:text-black">
            <CalendarClock className="mr-2" size={18} />
            {!collapsed && 'Календарь'}
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center text-gray-700 hover:text-black">
            <CheckCircle className="mr-2" size={18} />
            {!collapsed && 'Выполненные'}
          </a>
        </li>
      </ul>
    </motion.aside>
  );
}
