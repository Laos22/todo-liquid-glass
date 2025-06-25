import { FaTrash } from 'react-icons/fa'; // FontAwesome
import { MdEdit } from 'react-icons/md';   // Material Design
import { useDispatch } from 'react-redux';
import { removeTask } from '../features/tasks/tasksSlice';
import { openModalEdit } from '../features/modal/modalSlice';

import '../styles/liquid-glass.css';

export const TaskCard = ({ title, description, id, dueDate, dateCreated }) => {
  const dispatch = useDispatch()
  // console.log("render TaskCard")
  return (
    <div className="flex liquid-glass p-6 m-4">
      <div className='flex-1 flex flex-col justify-center'>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-opacity-80">{description}</p>
      </div>
      <div className='flex flex-col p-2 text-gray-600 text-xs mt-2'>
        <span className='font-bold'>Создано:</span>
        <span>{new Date(dateCreated).toLocaleDateString()}</span>
        {dueDate ? (
          <>
            <span className='mt-2 font-bold'>Исполнение:</span>
            <span>{dueDate}</span>
          </>
        ): null}
        
      </div>
      <div className='flex flex-col justify-start'>
        <button 
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => dispatch(removeTask(id))}
          >
          <FaTrash/>
        </button>
        <button 
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={() => dispatch(openModalEdit(id))}
          >
          <MdEdit/>
        </button>
      </div>
    </div>
  );
};