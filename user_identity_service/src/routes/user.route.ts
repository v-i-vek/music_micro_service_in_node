import { Router } from "express";
import { addUser, loginUser, registerUser } from "../controller/user.controller";
import { successValidator } from "../middleware/success.middleware";
const router = Router()

router.post('/addUser',addUser)
router.post('/register-user',registerUser)
router.get('/login',loginUser)

export default router
