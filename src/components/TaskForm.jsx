// Импортируем хуки React для работы с состоянием, эффектами и рефами
import { useEffect, useRef, useState } from "react";
// Импортируем экшен для закрытия модального окна
import { closeModal } from "../features/modal/modalSlice";
// Импортируем хуки Redux для доступа к состоянию и диспатча экшенов
import { useDispatch, useSelector } from "react-redux";
// Импортируем экшены для добавления и редактирования задачи
import { addTask, editTask } from "../features/tasks/tasksSlice";


const TaskForm = () => {
    // Получаем id редактируемой задачи из состояния модального окна
    const editId = useSelector(state => state.modal.editId)
    // Получаем список всех задач из состояния Redux
    const tasks = useSelector(state => state.tasks);
    // Находим задачу по id, если мы в режиме редактирования, иначе null
    const task = editId ? tasks.find(task => task.id === editId) : null;
    // Локальное состояние для названия задачи, инициализируем из задачи или пустой строкой
    const [title, setTitle] = useState(task?.title ?? "")
    // Локальное состояние для даты, инициализируем из задачи или пустой строкой
    const [dueDate, setDueDate] = useState(task?.dueDate ?? "")
    // Локальное состояние для описания задачи, инициализируем из задачи или пустой строкой
    const [description, setDescription] = useState(task?.description ?? "")
    // Получаем функцию dispatch для отправки экшенов
    const dispatch = useDispatch();
    // Создаем реф для обертки формы, чтобы отслеживать клики вне формы
    const formRef = useRef(null);

    // Функция обработки отправки формы
    const handleSubmit = (e) => {
        e.preventDefault(); // Отменяем стандартное поведение формы
        if (title === "") { // Проверяем, заполнено ли название задачи
            alert("Нужно заполнить данные!!!") // Показываем предупреждение
            return
        }
        if (!task) {
            // Если задача новая, диспатчим экшен добавления задачи
            dispatch(addTask({
                title,
                dueDate, 
                description, 
                id: Date.now(), // Генерируем уникальный id
                dateCreated: Date.now(), // Сохраняем дату создания
                checked: false // Новая задача не выполнена
            }))
        } else {
            // Если задача уже существует, диспатчим экшен редактирования
            dispatch(editTask({
                title,
                dueDate,
                description,
                id: editId // Используем id редактируемой задачи
            }))
        }
        // После добавления или редактирования закрываем модальное окно
        dispatch(closeModal())
    };

    // Эффект для закрытия модального окна при клике вне формы
    useEffect(() => {
        // Функция-обработчик клика по документу
        const hendleClickOutside = (e) => {
            // Если клик был вне формы — закрываем модальное окно
            if(formRef.current && !formRef.current.contains(e.target)) dispatch(closeModal());
        }
        // Добавляем обработчик клика мыши
        addEventListener('mousedown', hendleClickOutside);
        // Очищаем обработчик при размонтировании компонента
        return () => {
            removeEventListener('mousedown', hendleClickOutside);
        }
    }, [dispatch])

    // Рендерим форму для добавления или редактирования задачи
    return (
        <form 
            onSubmit={(e) => handleSubmit(e)} // Обработка отправки формы
            className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center"
        >
            <div
                ref={formRef} // Привязываем реф к контейнеру формы
                className="bg-slate-500 rounded-3xl p-8 shadow-xl max-w-md w-full text-white min-h-[300px]">
                    {/* Поле для ввода названия задачи */}
                    <input 
                        className="text-black rounded p-1 w-full" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Название"/>
                    {/* Поле для ввода описания задачи */}
                    <textarea 
                        className="text-black rounded w-full mt-4 p-1" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Описание задачи"/>
                    {/* Поле для выбора даты */}
                    <input
                        className="w-[50] text-black p-1 rounded"
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}/>
                    {/* Кнопка отправки формы: "Добавить" или "Изменить" */}
                    <button className="m-2 " type="submit">{task ? "Изменить" : "Добавить"}</button>
                    {/* Кнопка отмены, закрывает модальное окно */}
                    <button className="m-2" type="button" onClick={() => dispatch(closeModal())}>Отмена</button>
            </div>
        </form>
    )
}

// Экспортируем компонент формы задачи по умолчанию
export default TaskForm;