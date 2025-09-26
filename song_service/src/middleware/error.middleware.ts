import {Request,Response, NextFunction } from "express";
import { HttpException,EHttpCode } from "../utils/httpException";
import { EResponseType } from "../utils/responseInterface";
import { getMessage } from "../utils/message";



export const errorLogger = async(error:HttpException,req:Request,res:Response,next:NextFunction)=>{


       console.error("Error log: \n", {
        error,
        requestParam: {
            httpMethod: req.method,
            path: req.path,
            statusCode: req.statusCode,
            query: req.query,
            params: req.params,
            body: req.body,
            origin: req.headers.origin
        }
    })
    next(error)
}

export const errorHandler =(error: HttpException | Error | any, req: Request, res: Response, next: NextFunction)=>{
  let path: string = req.path;
    let type = error instanceof HttpException ? "Business" : "Application";
    let statusCode = error.statusCode || EHttpCode.INTERNAL_SERVER_ERROR;
    let message = error.message || errorParser(error)

    let response = {
        responseType: EResponseType.Error,
        statusCode: statusCode,
        message: message,
        data: {
            path: path,
            type: type
        }
    }
    res.status(statusCode).json(response);

}


const errorParser = (error: any): string => {
    let message = error.message || "Something went wrong";
    // TODO Use constraints
    if (error.errorType == "CognitoException") {
        // switch (error.name) {
        //   case "TokenExpiredError":
        //     message = getMessage("expireAccessToken");
        //     break;
        //   default:
        //     message = error.message || "Something went wrong Cognito";
        // }
    }
    else {
        switch (error.code) {
            case "NotAuthorizedException":
                switch (error.message) {
                    case "Incorrect username or password.":
                        message = getMessage("incorrectEmailPassword");
                        break;
                    case "Invalid Access Token":
                        message = getMessage("invalidAccessToken");
                        break;
                    case "Access Token has expired":
                        message = getMessage("expireAccessToken");
                        break;
                    default:
                        message = error.message || "something went wrong"

                }
        }
    }
    return message;
};