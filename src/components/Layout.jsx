import { useDispatch } from 'react-redux';
import Sidebar from './Sidebar'
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { openModal } from '../features/modal/modalSlice';
import { useSelector } from 'react-redux';
import Header from './Header';
import { col } from 'framer-motion/client';

const Layout = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.sideBar);
  const showModal = useSelector((state) => state.modal.show);
  // console.log("render Layout")
  return (
    <div className="flex flex-col h-dvh overflow-hidden relative">
      <Header />
    <div className="flex flex-1 overflow-auto">
      <Sidebar />
      <main className={`flex-1 flex flex-col shrink-0 overflow-auto ${!collapsed ? "p-0 md:p-4" : "p-4"}`}>
        <button
          onClick={() => dispatch(openModal())}
          className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md shadow-lg text-blue-700 text-3xl flex items-center justify-center hover:bg-white/40 transition"
        >
          +
        </button>
          <TaskList />
        {showModal && <TaskForm/>}
      </main>
    </div>
     
    </div>
  )
}

export default Layout
