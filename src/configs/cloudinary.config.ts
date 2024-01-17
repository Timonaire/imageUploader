import { v2 as cloudinary } from "cloudinary";
import { IImage } from "../api/interfaces/index.interface";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export default async (file: IImage) => {
    return await cloudinary.uploader.upload(file.filepath);
}