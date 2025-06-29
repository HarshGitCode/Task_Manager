import { apiConnector } from "./apiConnector";
const CREATE_TASK = "https://task-manager-5ca3.onrender.com/api/auth/createtask"
const UPDATE_TASK = "https://task-manager-5ca3.onrender.com/api/auth/update"
const DELETE_TASK = "https://task-manager-5ca3.onrender.com/api/auth/delete"
const GET_ALL_TASK = "https://task-manager-5ca3.onrender.com/api/auth/get"

export async function createTask(taskData,user,setActiveCreateTask,token){
    try {
        const userId = user._id;
        const response = await apiConnector("POST",CREATE_TASK,{...taskData,userId,token});

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        setActiveCreateTask(false);
    } catch (error) {
        console.log("CREATE_TASK API ERROR............", error)
    }
}


export async function updatedTask(updatedTaskData,userId,setUpdateTask,token){
    try {
        const response =  await apiConnector("POST",UPDATE_TASK,{updatedTaskData,userId,token});
        if(!response){
            throw new Error(response.message)
        }
        setUpdateTask(false);
    } catch (error) {
        console.log("UPDATE_TASK API ERROR............", error)
    }
}


export async function deleteTask(taskId,userId,token){
    try {
        
        const response = await apiConnector("POST",DELETE_TASK,{taskId,userId,token});
        if(!response.data.success){
            throw new Error(response.data.message)
        }

        return response

    } catch (error) {
        console.log("Delete_TASK API ERROR............", error)
    }
    }


export async function getAllTasks(userId,token){
    try {
        const response = await apiConnector("POST",GET_ALL_TASK,{userId,token});
        if(!response.data.success){
            throw new Error(response.data.message)
        }

        const tasks = response.data.data;
        return tasks
    } catch (error) {
         console.log("UPDATE_TASK API ERROR............", error)
         return response.data.message
    }
}


