const User = require("../models/User");
const Project = require("../models/Project");


exports.createProject = async(req, res)=>{
    try {
        
        const {userId} = req.body;
       
       
        const{projectName} = req.body
        if(!userId || !projectName){
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

       
        const project = await Project.create({
            projectName,
            createdAt: Date.now(),
        })
        
        
        res.json({
            success: true,
            message: "Project Created  successfully",
            data: project,    
        })
        
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to Created Project",
          error: error.message,
        })
    }
}

exports.updateTask = async (req, res)=>{
    try {
        const updates = {
            title: "harsh is a good coder",
            description: "he knew a all languages"
        }
        const {projectId, userId} = req.body
        if(!userId || !projectId || !updates){
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
        
        const  updatedProject= await Project.findByIdAndUpdate(projectId, updates, {new:true});
        //if i don't use if condition here it gives success true and in data it's give null when i pass wrong task id
        if(!updatedProject){
            return res.json({
                success: false,
                message: "task id not found",
            })
        }
       
        res.json({
            success: true,
            message: "Prject updated successfully",
            data: updatedProject,
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

