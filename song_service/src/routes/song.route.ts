import { Router } from "express";
import { addsong, getAllSongs } from "../contoller/song.controller"; // Corrected typo from "contoller"
import multer, { MulterError } from "multer";

const router = Router();

// This part is correct!
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB, not 5MB
}).single("file");

router.post('/addsong', upload, addsong);
router.get('/songs',getAllSongs)


// This middleware will catch errors specifically from multer
router.use((err: any, req: any, res: any, next: any) => {
    if (err instanceof MulterError) {
        console.log('----->', err)
        return res.status(400).json({ message: "File upload error", error: err.message });
    } else if (err) {
        return res.status(500).json({ message: "An unknown error occurred", error: err.message });
    }
    next();
});

export default router;