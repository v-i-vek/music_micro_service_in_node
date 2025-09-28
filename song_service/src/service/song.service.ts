import { Song } from "../models/song.model";
import { EHttpCode, HttpException } from "../utils/httpException";
import { ISong } from "../utils/interface/song.interface";
import { getMessage } from "../utils/message";
import { uploadFileToS3 } from "../utils/service/common.service";
import { publishEvent } from "./rabbitMq.service";





export const addSongDao = async (file, song: ISong, userId) => {
   try {
      const objectKey = `${userId}-${Math.ceil(Date.now() / 1000)}-${file.originalname}`;
      const s3Upload = await uploadFileToS3(file, objectKey)
      if (!s3Upload) throw new HttpException(EHttpCode.UNPROCESSABLE_ENTITY, getMessage("fileUploadFailed"))
      song.s3_url = s3Upload
      song.user_id = userId
      return await Song.create({ ...song })
   } catch (error) {
      console.log(error)
      throw new HttpException(EHttpCode.BAD_REQUEST, getMessage("dataNotFound"))
   }

}

export const getAllSongDao = async()=>{
   try {
     const result =  await Song.findAll()
     return result
   } catch (error) {
      console.log(error)
      throw new HttpException(EHttpCode.BAD_REQUEST,getMessage("somethingWentWrong"))
   }
}

export const deleteSong = async(id:string)=>{
   try {
      const song = await Song.findByPk(id)
      if(!song){
         throw new HttpException(EHttpCode.BAD_REQUEST,getMessage("dataNotFound"))
      }
      await publishEvent("song.deleted",song)   

      return await Song.destroy({where:{id}})
   } catch (error) {
      console.log(error)
      throw new HttpException(EHttpCode.BAD_REQUEST,getMessage("somethingWentWrong"))
   }
}