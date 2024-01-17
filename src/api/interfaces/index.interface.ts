import { Request } from 'express'
import { IImage } from "./upload.interface";

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
export { IImage, ICreateUpload} from "./upload.interface"