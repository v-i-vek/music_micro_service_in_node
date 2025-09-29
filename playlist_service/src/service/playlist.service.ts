import { Playlist } from "../models/playlist.model";
import { PlaylistSong } from "../models/playlistSong.model";
import { EHttpCode, HttpException } from "../utils/httpException";
import {
  IPlaylist,
  IPlaylistSong,
} from "../utils/interface/playlist.interface";
import { getMessage } from "../utils/message";
import { publishEvent } from "./rabbitMq.service";

export const createPlaylist = async (playlist: IPlaylist) => {
  try {
    return await Playlist.create({ ...playlist });
  } catch (error) {
    console.log(error);
    throw new HttpException(
      EHttpCode.CONFLICT,
      getMessage("somethingWentWrong")
    );
  }
};

export const getAllPlaylist = async () => {
  try {
    const result = await Playlist.findAll();
    return result;
  } catch (error) {
    console.log(error);
    throw new HttpException(
      EHttpCode.BAD_REQUEST,
      getMessage("somethingWentWrong")
    );
  }
};

export const deletePlaylist = async (id: string) => {
  try {
    const song = await Playlist.findByPk(id);
    if (!song) {
      throw new HttpException(
        EHttpCode.BAD_REQUEST,
        getMessage("dataNotFound")
      );
    }
    await publishEvent("song.deleted", song);

    return await Playlist.destroy({ where: { id } });
  } catch (error) {
    console.log(error);
    throw new HttpException(
      EHttpCode.BAD_REQUEST,
      getMessage("somethingWentWrong")
    );
  }
};

export const addSongToPlaylist = async (playListData: IPlaylistSong) => {
  try {
    return await PlaylistSong.create({ ...playListData });
  } catch (error) {
    console.log(error);

    throw new HttpException(
      EHttpCode.BAD_REQUEST,
      getMessage("somethingWentWrong")
    );
  }
};
