import { DataTypes, UUID, UUIDV4 } from "sequelize";
import sequelize from "../config/db";
import bcrypt from 'bcrypt'

export const User = sequelize.define(
    'User',{
        id:{
            type:UUID,
            defaultValue:UUIDV4,
            primaryKey:true
        },
        userName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
           type:DataTypes.STRING,
           allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }
)
User.beforeCreate(async(user,options)=>{
  try {
    user.dataValues.password = await bcrypt.hash(user.dataValues.password.toString(),10)
    
  } catch (error) {
    console.error(`Error while executing function in line number ${error}`)
    throw error
  }
})


