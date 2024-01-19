import { Request, Response } from 'express'
import { uploadToCloudinary } from '../../configs/index.config'
import { sendResponse } from '../utils/index.util'
import { uploadService } from '../services/index.service';
import { IGenericObject, IImage } from '../interfaces/index.interface';

type IUpload = { field: string; url: string; filename: string }

export default async (req: Request, res: Response) => {
    const uploads: IUpload[] = []
    if (req.files && req.files.length != 0) {
        for (const file of req.files) {
            const result = await uploadToCloudinary(file)
            uploads.push({field: file.fieldname, url: result.secure_url, filename: file.filename})

            if(file.fieldname === 'avatar' && req.params.id) {
                const existingUser: IImage | null = await uploadService.findOne({_id: req.params.id})
                if(!existingUser) return sendResponse(res, 404, false, 'User does not exist')

                if(req.user._id.toString() !== existingUser._id.toString()) return sendResponse(res, 403, false, 'You are not authorised to change this avatar')

                const updatedUser = await uploadService.updateOne(req.params.id, {avatar: result.secure_url})
                if(!updatedUser) return sendResponse(res, 401, false, 'Your avatar was not updated')

                const data: IGenericObject = updatedUser.toObject()
                delete data.password

                return sendResponse(res, 200, true, 'Avatar updated successfully!', data)
            }
        }
    }
        
    return sendResponse(res, 200, true, 'File(s) uploaded successfully!',uploads )
}

