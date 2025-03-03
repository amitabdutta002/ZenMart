import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
// import dotenv from "dotenv";

// dotenv.config(
//     {path:'./.env'}
// )
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if (!localFilePath) return null
    
        const res = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
    
        fs.unlinkSync(localFilePath)
        return res;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary}