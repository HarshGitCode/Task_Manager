import {useState} from 'react'
import CreateTask from '../CreateTask'
import TaskCard from "../common/TaskCard"

import { useSelector } from 'react-redux'


function Complete() {
   const user = useSelector(state=>state.user.user);
    const tasks = useSelector(state=>state.user.tasks);
  const userId = user._id;
  const [activeCreateTask, setActiveCreateTask] = useState(false)
  const [updateTask, setUpdateTask] = useState();
 
 

  const handleEdit = (task) => {
    setUpdateTask(task)
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleView = (task) => {
   
  };

  return (
    <div className="flex flex-col gap-2">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full">
        {tasks.map((task) =>
          task.status === "Completed" ? (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ) : null
        )}
      </div>
      {activeCreateTask || updateTask ? (<CreateTask setActiveCreateTask={setActiveCreateTask} updateTask={updateTask} setUpdateTask={setUpdateTask} />) : ("")}
    </div>
  )
}

export default Complete