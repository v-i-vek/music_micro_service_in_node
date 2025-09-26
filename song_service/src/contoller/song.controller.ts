import { Request,Response,NextFunction } from "express";
import { Song } from "../models/song.model";
import { addSongDao } from "../service/song.service";
import { EHttpCode, HttpException } from "../utils/httpException";
import { getMessage } from "../utils/message";



export const addsong = async (req:any,res:any,next:NextFunction) => {
    try {        
        if(!req.file) throw new HttpException(EHttpCode.NOT_FOUND,getMessage("fileNotFound"))
        const songs = req.body;
    console.log(req.app.locals.user)
        const result = await addSongDao(req.file,songs,req.app.locals.user)
        res.locals.data = result 
       next()

    } catch (error) {
        next(error)
    }


}
