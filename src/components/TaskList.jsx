import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchTasks } from '../features/tasks/tasksSlice';
import { TaskCard } from './TaskCard';

export default function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const filter = useSelector((state) => state.filter);
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks(user.uid));
    }
  }, [dispatch, user]);

  const filteredTasks = tasks.filter((task) => {
    if (!task) return false;
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