import { useEffect, useState } from "react"
import TaskCard from "../common/TaskCard"
import CreateTask from "../CreateTask";
import {Button} from "../common/Button"
import { deleteTask, getAllTasks,} from "../../Services/taskApi";
import { useSelector,useDispatch } from "react-redux";
import { setTasks } from "../../Services/redux/userSlice";

function Tasks() {
  const user = useSelector(state=>state.user.user);
  const tasks = useSelector(state=>state.user.tasks);
  const token = useSelector(state=>state.user.token);
 
  const dispatch = useDispatch();
 
  const userId = user._id;
 
  const [activeCreateTask, setActiveCreateTask] = useState(false)
  const [ updateTask, setUpdateTask] = useState(false);
  const [Tasks, setTask] = useState([]);
  

useEffect(()=>{
  const fetchData =async()=>{
    const result = await getAllTasks(userId,token);
    setTask(result);
    
  }
  fetchData();
 
},[userId,activeCreateTask,updateTask,dispatch])

dispatch(setTasks(Tasks));



  const handleEdit = (task) => {
    setUpdateTask(task);
  };

  const handleDelete = (id) => {
    deleteTask(id,userId);
    window.location.reload();
   
  };

  const handleView = (task) => {
  };

  return (
    <div className="flex flex-col gap-2">
    <div className="m-2 p-2">
      <Button onClick={()=>setActiveCreateTask(true)}>Create Task</Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full">
      {Tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      ))}
    </div>
    {activeCreateTask || updateTask ? (<CreateTask setActiveCreateTask={setActiveCreateTask} updateTask={updateTask} setUpdateTask={setUpdateTask}/>): ("")}
    </div>
    )
}

export default Tasks