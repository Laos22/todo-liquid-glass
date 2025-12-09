import { useSelector } from 'react-redux';
import { TaskCard } from './TaskCard';

export default function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const filter = useSelector((state) => state.filter);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.checked;
    if (filter === 'completed') return task.checked;
    return true;
  });

  if (filteredTasks.length === 0) {
    return <p className="text-gray-600 mt-5 text-center">Нет задач</p>;
  }

  return (
    <div className="space-y-4 flex-1 overflow-y-auto mt-2">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
}