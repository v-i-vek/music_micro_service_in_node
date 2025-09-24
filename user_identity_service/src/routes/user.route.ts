import { Router } from "express";
import { addUser } from "../controller/user.controller";
const router = Router()

router.post('/addUser',addUser)

export default router
