import { NextFunction,Request,Response } from "express";
import { User } from "../models/user.model";


export const addUser = async (req:Request,res:Response,next :NextFunction)=>{
    try {
        const{userName,email,password} = req.body

       const result = await User.create({userName,email,password})
       return res.json({status:200,message:'success',data:{result}})
    } catch (error) {
        console.log(error)
        throw error
    }
}