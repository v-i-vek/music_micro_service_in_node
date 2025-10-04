import { Router } from "express";
import multer, { MulterError } from "multer";

import { addPlaylist,addSongToPlaylist, getSongByPlaylist, updatePlaylistById ,deleteSongFromPlaylist, getAllUserPlaylist } from "../contoller/playlist.controller";

const router = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB, not 5MB
}).single("thumbnail");

router.post('/create-playlist',upload, addPlaylist);
router.post('/add-song-to-playlist',addSongToPlaylist)
router.get('/get-song-by-playlist/:id',getSongByPlaylist)
router.patch('/update-playlist',upload,updatePlaylistById)
router.delete('/delete-song-from-playlist',deleteSongFromPlaylist)
router.get('/get-all-user-playlist',getAllUserPlaylist)

export default router;