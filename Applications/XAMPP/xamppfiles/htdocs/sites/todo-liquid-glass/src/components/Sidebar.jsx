import { CalendarDays, CalendarClock, CheckCircle, ChevronLeft, ChevronRight, List, CheckSquare, Square } from 'lucide-react'; // Импорт иконок из библиотеки lucide-react
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'; // Импорт компонента motion для анимаций из framer-motion
import { useDispatch, useSelector } from 'react-redux'; // Импорт хуков для работы с Redux: useDispatch для отправки действий, useSelector для получения состояния
import { toggleSideBar, setFilter } from '../features/sideBar/sideBarSlice'; // Импорт действия toggleSideBar для переключения состояния боковой панели

export default function Sidebar() {
  const {collapsed, filter} = useSelector(state => state.sideBar); // Получаем текущее состояние collapsed боковой панели из Redux
  const dispatch = useDispatch(); // Получаем функцию dispatch для отправки действий в Redux

  // console.log("render Sidebar") // Закомментированный лог для отладки рендера компонента
  return (
    <motion.aside
      initial={{ width: collapsed ? 64 : 256 }} // Начальная ширина боковой панели: 64px если свернута, 256px если развернута
      animate={{ width: collapsed ? 64 : 256 }} // Анимация изменения ширины при смене состояния collapsed
      transition={{ duration: 0.3 }} // Длительность анимации 0.3 секунды
      className="bg-white/30 backdrop-blur-md shadow-md p-4 h-screen overflow-hidden" // Стили для боковой панели: полупрозрачный белый фон, размытие, тень, отступы, высота 100% экрана, скрытие переполнения
    >
      <div className="flex justify-between items-center mb-6">
        {!collapsed && <h2 className="text-xl font-bold text-gray-800">Меню</h2>} {/* Заголовок "Меню" отображается только если панель не свернута */}
        <button
          onClick={() => dispatch(toggleSideBar())} // При клике отправляем действие toggleSideBar для переключения состояния панели
          className="p-1 rounded hover:bg-white/50 transition" // Стили кнопки: отступы, скругление, эффект при наведении, плавный переход
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />} {/* Иконка стрелки меняется в зависимости от состояния collapsed */}
        </button>
      </div>

      <ul className="space-y-3 animate-[fade]"> {/* Список пунктов меню с вертикальными отступами и анимацией появления */}
        <li>
          <button
            onClick={() => dispatch(setFilter('all'))}
            className={`w-full flex items-center text-gray-700 hover:text-black ${filter === 'all' ? 'bg-white/50' : ''}`} // Стили ссылки: горизонтальное расположение элементов, цвет текста и при наведении
          >
            <List className="mr-2" size={18} /> {/* Иконка списка с отступом справа */}
            {!collapsed && 'Все задачи'} {/* Текст "Все задачи" отображается только если панель не свернута */}
          </button>
        </li>
        <li>
          <button
            onClick={() => dispatch(setFilter('completed'))}
            className={`w-full flex items-center text-gray-700 hover:text-black ${filter === 'completed' ? 'bg-white/50' : ''}`} // Стили ссылки: горизонтальное расположение элементов, цвет текста и при наведении
          >
            <CheckSquare className="mr-2" size={18} /> {/* Иконка галочки с отступом справа */}
            {!collapsed && 'Выполненные'} {/* Текст "Выполненные" отображается только если панель не свернута */}
          </button>
        </li>
        <li>
          <button
            onClick={() => dispatch(setFilter('active'))}
            className={`w-full flex items-center text-gray-700 hover:text-black ${filter === 'active' ? 'bg-white/50' : ''}`} // Стили ссылки: горизонтальное расположение элементов, цвет текста и при наведении
          >
            <Square className="mr-2" size={18} /> {/* Иконка квадрата с отступом справа */}
            {!collapsed && 'Активные задачи'} {/* Текст "Активные задачи" отображается только если панель не свернута */}
          </button>
        </li>
      </ul>
    </motion.aside>
  );
}