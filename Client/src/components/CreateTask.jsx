import{ useState, useEffect } from 'react'
import {Button} from "../components/common/Button"
import {  Trash2} from "lucide-react";
import { createTask, updatedTask } from '../Services/taskApi';
import { useSelector } from 'react-redux';


function CreateTask({setActiveCreateTask, updateTask, setUpdateTask}) {
  
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    subtasks: [],
    status: "",
  })
  
  useEffect(() => {
    if (updateTask) {
      setTaskData(updateTask);
    }
  }, [updateTask]);

  

  const user = useSelector(state=>state.user.user);
  const token = useSelector(state=>state.user.token);

   const userId = user._id;
  // (userId);

  const [inputSubTask, setInputSubTask] = useState("")

  const handleOnChange = (e)=>{
    setTaskData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  const addSubTask = ()=>{
    (inputSubTask);
    setTaskData((prevData) => ({
      ...prevData,
      subtasks: [...prevData.subtasks,inputSubTask],
    }));
    setInputSubTask("");
  }

  const deleteSubTask = (id)=>{
    
    const updatedsubtask = taskData.subtasks.filter((_,index) => index !== id)
    
    setTaskData((prevData) => ({
      ...prevData,
      subtasks: updatedsubtask,
    }));
   
  }

  const handleOnSubmit = ()=>{
    if(updateTask){
      updatedTask(taskData,userId,setUpdateTask,token);
    }
    else{
      createTask(taskData,user,setActiveCreateTask,token);
    }
  }

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 flex justify-center items-center bg-white/10 backdrop-blur-sm'>
    <div className='w-sm bg-white h-9/12 border-blue-400 border rounded-lg text-sm overflow-auto'>
        <h1 className='font-bold text-xl m-4'>Create An task</h1>
        <div className='m-6 w-2/3 flex flex-col gap-4'>
            <div className='flex flex-col'>
            <label htmlFor="">Title</label>
            <input type="text"
            name="title"
            value={taskData.title||""}
            onChange={handleOnChange}
            className='bg-gray-100 h-8 rounded-xs px-2' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="">Description</label>
              <input type="text"
              name="description"
              value={taskData.description||""}
              onChange={handleOnChange}
              className='bg-gray-100 h-8 rounded-xs px-2' />
            </div>
            <div>
              <div className=''>
                {
                  taskData.subtasks.map((subTask,index)=>(
                    <div key={index} className=' flex flex-row justify-between items-center rounded-2xl bg-amber-200 p-2 m-2 '>
                      <span>{subTask}</span>
                      <button className='p-2' onClick={()=>deleteSubTask(index)}><Trash2 size={14}/></button>
                    </div>
                  ))
                }
               
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="" className=''>Sub Tasks</label>
                <input type="text"
                name="subTasks"
                value = {inputSubTask}
                onChange={(e)=> setInputSubTask(e.target.value||"")} 
                className='bg-gray-100 h-8 rounded-xs px-2'/>
                <div className='flex justify-end'>
                  <Button className="bg-amber-300 text-xs" onClick={addSubTask}>Add SubTask</Button>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-1'> 
            <label htmlFor="status">Status</label>
            <select name='status' className="w-26 border border-gray-300 rounded-xs text-xs p-2" value={taskData.status||""}
            onChange={handleOnChange} >
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            </select>

            </div>
        </div>
            <div className='flex justify-between m-4 py-4'>
              <Button onClick={handleOnSubmit}>
              {!updateTask ?(<span>Add Task</span>):(<span>Edit Task</span>)}</Button>
              <Button onClick={()=>{setActiveCreateTask(false); setUpdateTask(false)}}>Cancel</Button>
            </div>

    </div>
    </div>
  )
}

export default CreateTask