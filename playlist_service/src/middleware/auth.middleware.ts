import { EHttpCode, HttpException } from "../utils/httpException"
import { getMessage } from "../utils/message"


export const authenticateReq = (req,res,next)=>{
    try {
        const userId = req.headers['x-user-id']
        if(!userId){
            throw new HttpException(EHttpCode.UNAUTHORIZED,getMessage("notAuthorized"))
        }
        req.app.locals.user = userId
        next()
    } catch (error) {
        next(error)
        throw error
    }
}