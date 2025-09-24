import { DataTypes, UUID, UUIDV4 } from "sequelize";
import sequelize from "../config/db";

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
//  User.sync({ alter: true }).then(()=>console.log("sync success")).catch((err)=>console.log(err));

console.log(User === sequelize.models.User); // true

