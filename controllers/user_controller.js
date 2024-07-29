import User from '../model/User.js';
import bcrypt from 'bcryptjs'


export const getAllUser = async(req,res,next)=>{
    let allUser
    try {
        allUser = await User.find();   
    } catch (error) {
        console.log(error)
    }
    if(!allUser){
        return res.status(404).json({"message": "User not found"})
    }
    res.status(200).json({allUser})
}


export const signup = async(req,res,next)=>{
    const {userName,email,password} = req.body;

    let existingUser
    
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(existingUser){
        res.status(400).json({"message": "User already Existis ,Please login"});

    }

    const hashedPassword = bcrypt.hashSync(password);


    const user = new User({
        userName,
        email,
        password : hashedPassword,
        blogs:[]
    })

    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({user})
}

export const login = async(req,res,next)=>{
    const {email,password} = req.body;
    console.log(password);
    let existingUser

    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        console.log(error);
    }

    if(!existingUser){
        return res.status(404).json({"message":"User not found"});
    }

    let isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(isPasswordCorrect){
        return res.status(200).json({"message":"Successfully Logged in",existingUser});
    }    

}