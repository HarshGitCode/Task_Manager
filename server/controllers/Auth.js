const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config();


exports.singup = async (req, res)=>{
    try {
        
        const {
            email, password, name, country 
        } = req.body

        
        
        //validation
        if(!email || !password || !name || !country){
            return res.status(403).send({
                success: false,
                message: "All field are required"
            })
        }

        const existingUser = await User.findOne({email});
        
        if(existingUser){
            return res.status(403).json({
                success: false,
                message: "User already exists. Please sign in to continue."
            })
        }

        //hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        

        //create the user
        const user = await User.create({
            email,
            password: hashPassword,
            name,
            country,
        })
       

        return res.status(200).json({
            success: true,
            user,
            message: "User Registered Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again."
        })  
    }
}

exports.signin = async(req, res)=>{
    try {
         // Get email and password from request body
        const { email, password } = req.body

        // Check if email or password is missing
        if (!email || !password) {
        // Return 400 Bad Request status code with error message
        return res.status(400).json({
            success: false,
            message: `Please Fill up All the Required Fields`,
        })
        }

       



        // Find user with provided email
        const user = await User.findOne({ email })
      
    
        // If user not found with provided email
        if (!user) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
            success: false,
            message: `User is not Registered with Us Please SignUp to Continue`,
            })
        }

        

        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, user.password)) {
           
            const token = jwt.sign(
            { email: user.email, id: user._id, country: user.country },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
            )

           
    
            // Save token to user document in database
            // user.token = token
            user.password = undefined
            // Set cookie for token and return success response
            const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            }
           
            res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: `User Login Success`,
            })
        } else {
            return res.status(401).json({
            success: false,
            message: `Password is incorrect`,
            })
        }

    } catch (error) {
        
    }
}

