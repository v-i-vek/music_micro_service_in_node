import sequelize from "../config/db";
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
    throw error
  }
};

export const getAllPlaylist = async () => {
  try {
    const result = await Playlist.findAll();
    return result;
  } catch (error) {
    console.log(error);
   throw error
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
   throw error
  }
};

export const addSongToPlaylist = async (playListData: IPlaylistSong) => {
  try {
    const {song_id,playlist_id} = playListData
    const isSongExist = await PlaylistSong.findOne({where:{song_id,playlist_id}})
    if(isSongExist){
      throw new HttpException(EHttpCode.CONFLICT,getMessage("songAlreadyExist"))
    }
    return await PlaylistSong.create({ ...playListData });
  } catch (error) {
    console.log(error);

   throw error
  }
};

export const getSongByPlaylist = async (playlistId: string) => {
  try {
    const [result, metadata] =
      await sequelize.query(` SELECT s.id,s.s3_url,s.title
  FROM playlist_songs ps
  LEFT JOIN songs s ON s.id = ps.song_id where ps.playlist_id = '${playlistId}'`);

    return result;
  } catch (error) {
    console.log(error);
   throw error
  }
};

export const updatePlaylist = async ( playlistData) => {
  try {

   const {user_id,id,title} = playlistData
    const result = await Playlist.update(
      {title},
      {
        where: {
          id: id,
          user_id:user_id
        },
      }
    );

    return result
  } catch (error) {
    console.log(error);
   throw error
  }
};


export const deleteSongFromPlaylist = async ( playlistData) => {
  try {

   const {song_id,playlist_id,user_id} = playlistData
   const isPlaylistExist = await Playlist.findOne({where:{id:playlist_id}})

   if(!isPlaylistExist)throw new HttpException(EHttpCode.NOT_FOUND,getMessage("playlistNotFound"))
   if(isPlaylistExist && isPlaylistExist?.dataValues.user_id !== user_id){
      throw new HttpException(EHttpCode.UNAUTHORIZED,getMessage("notAuthorized"))
      
   }     
   const result = await PlaylistSong.destroy({where:{playlist_id,song_id}}

   )
    return result
  } catch (error) {
    console.log(error);
   throw error
  }
};



