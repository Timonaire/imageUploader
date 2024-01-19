import express from 'express';
import {ImageController }from '../controllers/index.controller';
import { upload} from '../../configs/index.config'

const uploadRouter = express.Router();

// Route for image upload
uploadRouter.post('/upload', upload.single('image'), ImageController.uploadImage);

export default uploadRouter;
