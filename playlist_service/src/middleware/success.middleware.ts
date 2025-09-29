import { Response, Request, NextFunction, response } from "express";
import { EHttpCode, } from "../utils/httpException";
import { EResponseType } from "../utils/responseInterface";


export const successValidator = async (req: Request, res: Response, NextFunction: NextFunction)=>{

    let statusCode = EHttpCode.OK

    let response = {
        responseType: EResponseType.Success,
        statusCode: EHttpCode.OK,
        message: res.locals.message || "Success",
        data: res.locals.data || res.locals || {},
    }
    res.status(statusCode).json(response);
}