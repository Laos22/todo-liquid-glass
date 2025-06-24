import { useEffect, useRef, useState } from "react";
import { closeModal } from "../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/tasksSlice";


const TaskForm = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === "") {
            alert("Нужно заполнить данные!!!")
            return
        }
        console.log(title)
        // логика создания задачи
        dispatch(addTask({title, description, id: Date.now(), checked: false}))
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
                    <input className="text-black rounded" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название"/>
                    <textarea className="text-black rounded w-full mt-4" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание задачи"/>
                    <button className="m-2 " type="submit">Добавить</button>
                    <button className="m-2" type="button" onClick={() => dispatch(closeModal())}>Отмена</button>
            </div>
        </form>
    )

}

export default TaskForm;