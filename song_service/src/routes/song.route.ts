import { Router } from "express";
import { addsong } from "../contoller/song.controller";

const router = Router()

router.post('/addsong',addsong)

export default router
