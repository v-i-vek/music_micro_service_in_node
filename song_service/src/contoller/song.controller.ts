import { Request,Response,NextFunction } from "express";
import { Song } from "../models/song.model";
import { addSongDao, getAllSongDao,deleteSong } from "../service/song.service";
import { EHttpCode, HttpException } from "../utils/httpException";
import { getMessage } from "../utils/message";



export const addsong = async (req:any,res:any,next:NextFunction) => {
    try {        
        if(!req.file) throw new HttpException(EHttpCode.NOT_FOUND,getMessage("fileNotFound"))
        const songs = req.body;
        const result = await addSongDao(req.file,songs,req.app.locals.user)
        res.locals.data = result 
       next()

    } catch (error) {
        next(error)
    }
}

export const getAllSongs = async(req,res,next)=>{
    try {
        const result = await getAllSongDao()
        res.locals.data = result
        next()
    } catch (error) {
        next(error)
    }
}

export const deleteSongbyId = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        const id = req.params.id
        if(!id)throw new HttpException(EHttpCode.BAD_REQUEST,getMessage("dataNotFound"))
        const result = await deleteSong(id)
        next()
    } catch (error) {
        next(error)
    }
}
