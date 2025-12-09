import { useEffect, useRef, useState } from "react";
import { closeModal } from "../features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/tasksSlice";


const TaskForm = () => {
    const editId = useSelector(state => state.modal.editId)
    const tasks = useSelector(state => state.tasks);
    const task = editId ? tasks.find(task => task.id === editId) : null;
    const [title, setTitle] = useState(task?.title ?? "")
    const [dueDate, setDueDate] = useState(task?.dueDate ?? "")
    const [description, setDescription] = useState(task?.description ?? "")
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === "") {
            alert("Нужно заполнить данные!!!")
            return
        }
        if (!task) {
            dispatch(addTask({
                title,
                dueDate, 
                description, 
                id: Date.now(),
                dateCreated: Date.now(), 
                checked: false}))
        } else {
            dispatch(editTask({
                title,
                dueDate,
                description,
                id: editId
            }))
        }
        

        dispatch(closeModal())
    };

    useEffect(() => {
        const hendleClickOutside = (e) => {
            if(formRef.current && !formRef.current.contains(e.target)) dispatch(closeModal());
        }
        addEventListener('mousedown', hendleClickOutside);
        return () => {
            removeEventListener('mousedown', hendleClickOutside);
        }
    }, [dispatch])

    return (
        <form 
            onSubmit={(e) => handleSubmit(e)} 
            className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center"
            >
            <div
                ref={formRef} 
                className="bg-slate-500 rounded-3xl p-8 shadow-xl max-w-md w-full text-white min-h-[300px]">
                    <input 
                        className="text-black rounded p-1 w-full" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Название"/>
                    <textarea 
                        className="text-black rounded w-full mt-4 p-1" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Описание задачи"/>
                    <input
                        className="w-[50] text-black p-1 rounded"
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}/>
                    <button className="m-2 " type="submit">{task ? "Изменить" : "Добавить"}</button>
                    <button className="m-2" type="button" onClick={() => dispatch(closeModal())}>Отмена</button>
            </div>
        </form>
    )

}

export default TaskForm;