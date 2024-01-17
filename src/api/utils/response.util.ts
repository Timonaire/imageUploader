import { Response, Request } from "express";
import { IGenericObject, IPaginate } from "../interfaces/index.interface";

export default function sendResponse(
    res: Response,
    req: Request,
    status: number,
    success: boolean,
    message : string | IGenericObject,
    data?: string | IGenericObject,
    pagination?: IPaginate
) {
   
    const response = {
        status,
        success,
        message,
        pagination,
        data
    };

    return res.status(status).json(response);

}