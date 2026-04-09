import { useDispatch } from 'react-redux';
import Sidebar from './Sidebar'
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { openModal } from '../features/modal/modalSlice';
import { useSelector } from 'react-redux';

const Layout = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.show);
  // console.log("render Layout")
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 max-h-[100vh]">
      <Sidebar />
      <main className="flex-1 p-6 flex flex-col">
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
  )
}

export default Layout
