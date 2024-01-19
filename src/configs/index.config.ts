import { Request, Response } from "express"
import { sendResponse } from "../api/utils/index.util";

export const HEALTH_CHECK = (req: Request, res: Response) => res.sendStatus(200)
export const PAGE_NOT_FOUND = (req: Request, res: Response) => sendResponse(res, 404, false, 'page not found')
export { default as uploadToCloudinary } from './cloudinary.config'
export { default as upload } from './multer.config'
export { default as runDatabase } from './db.config'