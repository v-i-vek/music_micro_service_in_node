import dotenv from "dotenv"
dotenv.config()


import {consumeEvent} from './service/rabbitmq.js'
import { deleteSong } from "./event-handler/deleteSongEvent.js"

consumeEvent("song.deleted",deleteSong).then(()=>console.log("deleted succesfully")).catch((err)=>console.log('error',err))