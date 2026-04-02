import { FaTrash } from 'react-icons/fa'; // FontAwesome
import { MdEdit } from 'react-icons/md';   // Material Design
import { useDispatch } from 'react-redux';
import { removeTask, toggleCheckedTask, editTask } from '../features/tasks/tasksSlice';
import { openModalEdit } from '../features/modal/modalSlice';
import { useState } from 'react';

import '../styles/liquid-glass.css';

export const TaskCard = ({ title, description, id, dueDate, checked, dateCreated }) => {
  const dispatch = useDispatch()

  // Состояния для инлайнового редактирования
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [tempDesc, setTempDesc] = useState(description);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [tempDate, setTempDate] = useState(dueDate);

  const handleTitleSave = () => {
    if (tempTitle.trim() !== "" && tempTitle !== title) {
      dispatch(editTask({ id, title: tempTitle.trim() }));
    } else {
      setTempTitle(title);
    }
    setIsEditingTitle(false);
  };

  const handleDescSave = () => {
    if (tempDesc !== description) {
      dispatch(editTask({ id, description: tempDesc.trim() }));
    } else {
      setTempDesc(description);
    }
    setIsEditingDesc(false);
  };

  const handleDateSave = () => {
    if (tempDate !== dueDate) {
      dispatch(editTask({ id, dueDate: tempDate }));
    }
    setIsEditingDate(false);
  };

  const handleKeyDown = (e, type) => {
    if (e.key === 'Enter') {
      e.target.blur(); // Триггерит onBlur (сохранение)
    } else if (e.key === 'Escape') {
      if (type === 'title') { setTempTitle(title); setIsEditingTitle(false); }
      else if (type === 'desc') { setTempDesc(description); setIsEditingDesc(false); }
      else if (type === 'date') { setTempDate(dueDate); setIsEditingDate(false); }
    }
  };

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
        {isEditingTitle ? (
          <input
            autoFocus
            className="text-xl font-semibold bg-white/20 border-b border-blue-400 outline-none w-full"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={(e) => handleKeyDown(e, 'title')}
          />
        ) : (
          <h3 
            onClick={() => setIsEditingTitle(true)}
            className={`text-xl font-semibold cursor-text hover:bg-white/10 transition-colors ${checked ? 'line-through opacity-50' : ''}`}
          >
            {title}
          </h3>
        )}

        {isEditingDesc ? (
          <textarea
            autoFocus
            className="text-sm bg-white/20 border-b border-blue-400 outline-none w-full resize-none mt-1"
            value={tempDesc}
            onChange={(e) => setTempDesc(e.target.value)}
            onBlur={handleDescSave}
            onKeyDown={(e) => handleKeyDown(e, 'desc')}
          />
        ) : (
          <p 
            onClick={() => setIsEditingDesc(true)}
            className={`text-opacity-80 cursor-text hover:bg-white/10 min-h-[1.5em] ${checked ? 'line-through opacity-50' : ''}`}
          >
            {description || <span className="italic opacity-40">Добавить описание...</span>}
          </p>
        )}
      </div>
      <div className='flex flex-col p-1 text-gray-600 text-xs mt-1'>
        <span className='font-bold'>Создано:</span>
        <span>{new Date(dateCreated).toLocaleDateString()}</span>
        <span className='mt-1 font-bold'>Исполнение:</span>
        {isEditingDate ? (
          <input
            autoFocus
            type="date"
            className="text-xs bg-white/20 border-b border-blue-400 outline-none text-gray-800 rounded px-1"
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)}
            onBlur={handleDateSave}
            onKeyDown={(e) => handleKeyDown(e, 'date')}
          />
        ) : (
          <span 
            onClick={() => setIsEditingDate(true)} 
            className="cursor-pointer hover:bg-white/10 px-1 rounded transition-colors"
          >
            {dueDate ? new Date(dueDate).toLocaleDateString() : 'Не указано'}
          </span>
        )}
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