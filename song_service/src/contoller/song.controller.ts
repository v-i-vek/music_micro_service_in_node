import { Request,Response,NextFunction } from "express";
import { Song } from "../models/song.model";
import { addSongDao } from "../service/song.service";



export const addsong = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const songs = req.body;
        const result = await addSongDao(songs)
        res.locals.data = result 
       next()

    } catch (error) {
        next(error)
    }


}
