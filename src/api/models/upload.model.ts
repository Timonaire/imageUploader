import { model, Schema } from 'mongoose'
import { IImage } from '../interfaces/index.interface'

const uploadsSchema = new Schema<IImage>({
     filename: {
        type: String,
        required: true
      },
      filepath: {
        type: String,
        required: true
      },
      mimetype: {
        type: String,
        required: true
      },
      size: {
        type: Number,
        required: true
      },
    }, {timestamps: true})

  // Add any other fields that might be necessary for your application

export default model<IImage>('Upload', uploadsSchema)

