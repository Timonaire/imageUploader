import { Router } from 'express'
import { authenticate, uploadFiles } from '../../middlewares/index.middleware'
import { upload } from '../../../configs/index.config'

const uploadRouter = Router()

uploadRouter.post('/upload', [authenticate, upload.array('images')], uploadFiles)

export default uploadRouter