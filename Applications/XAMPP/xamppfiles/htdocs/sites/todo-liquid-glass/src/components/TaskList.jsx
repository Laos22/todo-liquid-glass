import { useSelector } from 'react-redux';
import { TaskCard } from './TaskCard';

export default function TaskList() {
  const tasks = useSelector(state => state.tasks);
  const filter = useSelector(state => state.sideBar.filter);

  // Фильтрация задач в зависимости от выбранного фильтра
  const filteredTasks = tasks.filter(task => {
    switch(filter) {
      case 'completed':
        return task.checked;
      case 'active':
        return !task.checked;
      default:
        return true; // 'all' - показываем все задачи
    }
  });

  if (filteredTasks.length === 0) {
    return <p className="text-gray-600 mt-5 text-center">
      {filter === 'completed' ? 'Нет выполненных задач' :
       filter === 'active' ? 'Нет активных задач' :
       'Нет задач'}
    </p>;
  }

  // console.log("render TaskList")
  return (
    <div className="space-y-4 flex-1 overflow-y-auto mt-2">
      {filteredTasks.map(task => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
}