import { FaTrash } from 'react-icons/fa'; // FontAwesome
import { MdEdit } from 'react-icons/md';   // Material Design
import { useDispatch } from 'react-redux';
import { removeTask, toggleCheckedTask } from '../features/tasks/tasksSlice';
import { openModalEdit } from '../features/modal/modalSlice';

import '../styles/liquid-glass.css';
// import { useState } from 'react';

export const TaskCard = ({ title, description, id, dueDate, checked, dateCreated }) => {
  const dispatch = useDispatch()
  // const [isChecked, setIsChecked] = useState(checked)
  return (
    <div className="flex liquid-glass p-3 m-3">
      <input
        className='w-5 h-5 m-3' 
        type="checkbox"
        onChange={() => {
          // setIsChecked(!isChecked)
          dispatch(toggleCheckedTask(id))
        }} 
        checked={checked}/>
      <div className='flex-1 flex flex-col justify-center'>
        <h3 className={`text-xl font-semibold ${checked ? 'line-through' : ''}`}>{title}</h3>
        <p className={`text-opacity-80 ${checked ? 'line-through' : ''}`}>{description}</p>
      </div>
      <div className='flex flex-col p-1 text-gray-600 text-xs mt-1'>
        <span className='font-bold'>Создано:</span>
        <span>{new Date(dateCreated).toLocaleDateString()}</span>
        {dueDate ? (
          <>
            <span className='mt-1 font-bold'>Исполнение:</span>
            <span>{dueDate}</span>
          </>
        ): null}
        
      </div>
      <div className='flex flex-col justify-start'>
        <button 
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={() => dispatch(removeTask(id))}
          >
          <FaTrash/>
        </button>
        <button 
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={() => dispatch(openModalEdit(id))}
          >
          <MdEdit/>
        </button>
      </div>
    </div>
  );
};