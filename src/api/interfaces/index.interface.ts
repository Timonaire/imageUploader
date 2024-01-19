//Import necessay models and packages
import { Request } from 'express'
import { IImage } from "./upload.interface";

//This is to cover for type errors
export interface IGenericObject {
    [key: string]: any
}

export interface CustomRequest extends Request {
    user: IImage; 
}

export interface IPaginate {
    currentPage: Number;
    totalPages: Number
}

export type ICustomValidationFields = (value: any, helpers: any, fieldToCheck: any, valueToCheck: any) => any
export { IImage, IUploadImage} from "./upload.interface"