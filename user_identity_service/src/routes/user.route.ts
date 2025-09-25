import { Router } from "express";
import { addUser, registerUser } from "../controller/user.controller";
import { successValidator } from "../middleware/success.middleware";
const router = Router()

router.post('/addUser',addUser,successValidator)
router.post('/register-user',registerUser)

export default router
