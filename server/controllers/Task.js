const Task = require("../models/Task");
const User = require("../models/User");



exports.createTask = async(req, res)=>{
    try {
        const {userId} = req.body;
        const{title, description,subtasks,status} = req.body
        if(!userId){
            return res.status(400).json({
                success: false,
                meassage: "please login "
            }
            )
        }

       
        const user = await User.findById(userId);
        
        
        if(!user){
            return res.status(400).json({
                success: false,
                meassage: "please login "
            })
        }

        const task = await Task.create({
            title,
            description,
            createdAt: Date.now(),
            status,
            subtasks,
            userId
        })
        

        res.json({
            success: true,
            message: "Task Created successfully",
            data: task,    
        })
        
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to Created Task",
          error: error.message,
        })
    }
}

exports.updateTask = async (req, res)=>{
    try {
        const {updatedTaskData,userId} = req.body;

        if(!userId||!updatedTaskData){
            return res.status(400).send({
                success: false,
                meassage: "please login "
            }
            )
        }

        //user validation
         
                const user = await User.findById(userId);
                
                if(!user){
                    return res.status(400).json({
                        success: false,
                        meassage: "please login "
                    })
                }
        
        const updatedTask = await Task.findByIdAndUpdate(updatedTaskData.id, updatedTaskData, {new:true});
        if(!updatedTask){
            return res.json({
                success: false,
                message: "task id not found",
            })
        }
       
        res.json({
            success: true,
            message: "Task updated successfully",
            data: updatedTask,
          })
    } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to update task",
          error: error.message,
        })
    }
}

exports.deleteTask = async (req, res)=>{
        try {
            const {taskId,userId} = req.body;
            if(!taskId||!userId){
               
                return res.status(400).send({
                    success: false,
                    meassage: "please login "
                }
                )

            }

           
            const response = await Task.findByIdAndDelete(taskId);
            res.status(200).send({
                success: true,
                message: "Task is Successfully Delete",
                data: response,
            })

        } catch (error) {

            console.error(error)
            res.status(500).json({
              success: false,
              message: "Failed to delete task",
              error: error.message,
            })
            
        }
}

exports.getTaskDetails = async (req, res)=>{
    try {
        const {taskId} = req.body;
            if(!taskId){
                return res.status(400).send({
                    success: false,
                    meassage: "please login "
                }
                )
            }
        const taskDetails = await Task.findById(taskId);
        if(!taskDetails){
            return res.json({
                success: false,
                message: "Task id is not found",
              })
        }
        res.json({
            success: true,
            message: "get task details successfully",
            data: taskDetails
          })
    } catch (error) {
        console.error(error)
            res.status(500).json({
              success: false,
              message: "Failed to delete task",
              error: error.message,
            })
    }
}

exports.getAllTasks = async(req, res)=>{
    try {
        const {userId} = req.body;
        
        const tasks = await Task.find({userId: userId});
        res.json({
            success: true,
            message: "Get all Tasks Successfully",
            data: tasks
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to get All Taskes",
          error: error.message,
        })  
    }
}