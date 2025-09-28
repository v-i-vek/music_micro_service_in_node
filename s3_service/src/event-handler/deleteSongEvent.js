import { deleteFileFromS3 } from "../service/s3client.js"



export const deleteSong = async(content)=>{
    try {
        const{s3_url} = content
        await deleteFileFromS3(s3_url)
        console.log(`${s3_url} Deleted successfully`)
        return 
    } catch (error) {
        
    }
}