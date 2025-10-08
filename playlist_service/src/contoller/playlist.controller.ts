import { Request, Response, NextFunction, response } from "express";
import { EHttpCode, HttpException } from "../utils/httpException";
import { getMessage } from "../utils/message";
import { createPlaylist } from "../service/playlist.service";
import * as playlistService from "../service/playlist.service";

export const addPlaylist = async (req: any, res: any, next: NextFunction) => {
  try {
    const playlistData = req.body;
    playlistData.user_id = req.app.locals.user;
    if (!req.file) throw new HttpException(EHttpCode.NOT_FOUND, getMessage("fileNotFound"))
    const result = await createPlaylist(req.file, playlistData);
    res.locals.data = result;
    next();
  } catch (error) {
    next(error);
  }
};

export const addSongToPlaylist = async (req, res, next) => {
  try {
    const playlistData = req.body;
    const result = await playlistService.addSongToPlaylist(playlistData);
    res.locals.data = result;
    next();
  } catch (error) {
    next(error);
  }
};

export const deleteSongbyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};

export const getSongByPlaylist = async (req, res, next) => {
  try {
    const playlist_id = req.params.id;
    console.log("callled ", playlist_id)
    const result = await playlistService.getSongByPlaylist(playlist_id);
    res.locals.data = result;
    next();
  } catch (error) {
    next(error);
  }
};

export const updatePlaylistById = async (req, res, next) => {
  try {
    const playlistData = req.body;
    playlistData.user_id = req.app.locals.user;
    const result = await playlistService.updatePlaylist(playlistData);
    res.locals.data = result;

    next();
  } catch (error) {
    next(error);
  }
};

export const deleteSongFromPlaylist = async (req, res, next) => {
  try {
    const playlistData = req.body;
    playlistData.user_id = req.app.locals.user;
    const result = await playlistService.deleteSongFromPlaylist(playlistData);
    res.locals.data = result;

    next();
  } catch (error) {
    next(error);
  }
};

export const getAllUserPlaylist = async (req, res, next) => {
  try {
    const user_id = req.app.locals.user;
    const result = await playlistService.getAllUserPlaylist(user_id);
    res.locals.data = result;
    next();
  } catch (error) {
    next(error);
  }
};
