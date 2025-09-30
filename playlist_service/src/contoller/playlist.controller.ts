import { Request,Response,NextFunction, response } from "express";
import { EHttpCode, HttpException } from "../utils/httpException";
import { getMessage } from "../utils/message";
import { createPlaylist } from "../service/playlist.service";
import * as playlistService from "../service/playlist.service"


export const addPlaylist = async (req:any,res:any,next:NextFunction) => {
    try {        
        
        const playlistData = req.body;
        playlistData.user_id = req.app.locals.user
        const result = await createPlaylist(playlistData)
        res.locals.data = result 
        next()

    } catch (error) {
        next(error)
    }
}

export const addSongToPlaylist = async(req,res,next)=>{
    try {
        const playlistData = req.body
        const result = await playlistService.addSongToPlaylist(playlistData)
        res.locals.data = result 
        next()
    } catch (error) {
        next(error)
    }
}

export const deleteSongbyId = async(req:Request , res:Response , next:NextFunction)=>{
    try {
        
       
        next()
    } catch (error) {
        next(error)
    }
}

export const getSongByPlaylist = async(req,res,next)=>{
    try {
         const playlist_id = req.params.id
        const result = await playlistService.getSongByPlaylist(playlist_id)
        res.locals.data = result 
        next()
    } catch (error) {
        next(error)
    }
}

export const updatePlaylistById = async(req,res,next)=>{
    try {
        const playlistData = req.body
        playlistData.user_id = req.app.locals.user
        const result = await playlistService.updatePlaylist(playlistData)
        res.locals.data = result 

        next()
    } catch (error) {
        next(error)
    }
}

export const deleteSongFromPlaylist = async(req,res,next)=>{
    try {
        const playlistData = req.body;
        playlistData.user_id = req.app.locals.user
        const result = await playlistService.deleteSongFromPlaylist(playlistData)
        res.locals.data = result 

        next()
    } catch (error) {
        next(error)
    }
}