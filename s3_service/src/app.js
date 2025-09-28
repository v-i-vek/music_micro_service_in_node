import dotenv from "dotenv"
dotenv.config()
console.log("-----",process.env.RABBITMQ_URL)
console.log("=====",process.env.ACCESS_KEY)
console.log("=====", process.env.BUCKET_NAME)

import {consumeEvent} from './service/rabbitmq.js'
import { deleteSong } from "./event-handler/deleteSongEvent.js"

consumeEvent("song.deleted",deleteSong).then(()=>console.log("deleted succesfully")).catch((err)=>console.log('error',err))