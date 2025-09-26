import { Song } from "../models/song.model";
import { EHttpCode, HttpException } from "../utils/httpException";
import { ISong } from "../utils/interface/song.interface";
import { getMessage } from "../utils/message";





export const  addSongDao =  async(song:ISong)=>{
   try {
      return await Song.create({...song})
   } catch (error) {
    console.log(error)
    throw new HttpException(EHttpCode.BAD_REQUEST,getMessage("dataNotFound"))
   }

}