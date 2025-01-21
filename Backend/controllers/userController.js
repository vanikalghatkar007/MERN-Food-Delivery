import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login user
const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false ,message:"User does not exist!"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success:false, message:"Invalid credentials!"})
        }

        const token = createToken(user._id);
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false , message:"Cannot login!"})
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register user
const registerUser = async(req, res) => {
    const {name, password, email} = req.body;
    try {
        //checking if the user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"User already exists"})
        }

        //validating email and pwd format
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter valid email "})
        }

        if(password.length<8){
            return res.json({success:false, message:"Please enter strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(8)
        const hashedPassword = await bcrypt.hash(password,salt);

        //create new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        //save the user in db
        const user = await newUser.save()

        // encrypt user 
        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Cannot register user"})
    }
}

export {loginUser, registerUser}