import { User } from "../models/user.model";
import { IUser } from "../utils/interface/user.interface";


export const registerUserDao = async(user:IUser)=>{

  try {
      const {email,password,userName} = user;
      const userExist = await User.findOne({where:{email,userName}})
      if(!userExist){
        
        return await User.create({email,password,userName})
      }

  } catch (error) {
    throw error
  }

}