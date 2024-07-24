

import User from '../model/User';


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