import { PutObjectCommand, S3Client,DeleteObjectCommand } from "@aws-sdk/client-s3";

const REGION = process.env.REGION
const s3Client = new S3Client({
    region:REGION,
    credentials:{
        accessKeyId:process.env.ACCESS_KEY,
        secretAccessKey:process.env.SECRET_ACCESS_KEY
    }
})

const bucketName =  process.env.BUCKET_NAME;

// export const uploadFileToS3 = async (file, objectKey) => {
//   try {
//     if (!bucketName) {
//       throw new Error("BUCKET_NAME environment variable is not set");
//     }

//     const uploadFileParams = {
//       Bucket: bucketName,
//       Key: objectKey, 
//       Body: file.buffer, 
//       ContentType: file.mimetype, 
//     };

//     // console.log("S3 Upload Parameters:", {
//     //   Bucket: uploadFileParams.Bucket,
//     //   Key: uploadFileParams.Key,
//     //   ContentType: uploadFileParams.ContentType,
//     //   BodySize: uploadFileParams.Body.length,
//     // });

//     const command = new PutObjectCommand(uploadFileParams);
//     await s3Client.send(command);
//     const objectUrl = `https://${bucketName}.s3.${REGION}.amazonaws.com/${objectKey}`;
//     return objectUrl;

//   } catch (error) {
//     console.log("Error while executing uploadFileTos3() function \n", error);
//     throw error;
//   }
// };

console.log(bucketName)
export const deleteFileFromS3 = async (objectKey) => {
    const REGION = process.env.REGION
const s3Client = new S3Client({
    region:REGION,
    credentials:{
        accessKeyId:process.env.ACCESS_KEY,
        secretAccessKey:process.env.SECRET_ACCESS_KEY
    }
})

const bucketName =  process.env.BUCKET_NAME;
  try {
    console.log(bucketName)
    if (!bucketName) {
      throw new Error("BUCKET_NAME environment variable is not set");
    }

    const input = {
      Bucket: bucketName,
      Key: objectKey,// pass the object name stored in the s3.
    };
    const command = new DeleteObjectCommand(input);
    const response = await s3Client.send(command);
  } catch (error) {
    console.log("Error while executing deleteFileFromS3() function \n", error);
    throw error;
  }
};
