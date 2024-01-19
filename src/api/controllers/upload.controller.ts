//importing necessary models and packages
import { Request, Response } from 'express';
import { uploadService } from '../services/index.service';
import { sendResponse } from '../utils/index.util';
import { IImage } from '../interfaces/index.interface';

//create the controller class
class ImageController {
    //confirm that there is an image file being uploaded
    async uploadImage(req: Request, res: Response) {
        if (!req.file) {
            return sendResponse(res, 400, false, 'No image file provided');
        }

        //confirming the components of the file being uploaded
        const { filename, path, mimetype, size } = req.file;
        const uploadedImage: IImage = {
            filename,
            filepath: path,
            mimetype,
            size
        };

        try {
            const savedImage = await uploadService.create(uploadedImage);
            return sendResponse(res, 201, true, 'Image uploaded successfully', { imageId: savedImage._id });
        } catch (error) {
            return sendResponse(res, 500, false, 'Error uploading image');
        }
    }

    //getting an image from the already stored images
    async getImage(req: Request, res: Response) {
        const imageId = req.params._id;

        try {
            const image = await uploadService.findOne(imageId);
            if (!image) {
                return sendResponse(res, 404, false, 'Image not found');
            }

            return sendResponse(res, 200, true, 'Image fetched successfully', image);
        } catch (error) {
            return sendResponse(res, 500, false, 'Error fetching image');
        }
    }
}

export default new ImageController();
