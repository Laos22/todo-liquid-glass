import { useSelector } from 'react-redux';
import { TaskCard } from './TaskCard';

export default function TaskList() {
  const tasks = useSelector(state => state.tasks);

  if (tasks.length === 0) {
    return <p className="text-gray-600 mt-5 text-center">Нет задач</p>;
  }

  // console.log("render TaskList")
  return (
    <div className="space-y-4 flex-1 overflow-y-auto mt-6">
      {tasks.map(task => (
        <TaskCard key={task.id} title={task.title} description={task.description} />


        // <div
        //   key={task.id}
        //   className="bg-white/50 backdrop-blur-md p-4 rounded shadow text-gray-800"
        // >
        //   <h3 className="text-lg font-semibold">{task.title}</h3>
        //   {task.description && (
        //     <p className="text-sm text-gray-700">{task.description}</p>
        //   )}
        // </div>
      ))}
    </div>
  );
}