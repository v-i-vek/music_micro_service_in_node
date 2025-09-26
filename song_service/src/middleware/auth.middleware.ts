import { EHttpCode, HttpException } from "../utils/httpException"
import { getMessage } from "../utils/message"


const authenticateReq = (req,res,next)=>{
    try {
        const userId = req.headers['x-user-id']
        if(!userId){
            throw new HttpException(EHttpCode.UNAUTHORIZED,getMessage("notAuthorized"))
        }
        req.user = {userId}
        next()
    } catch (error) {
        next(error)
        throw error
    }
}