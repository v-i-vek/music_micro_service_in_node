import { Router } from "express";
import { addPlaylist,addSongToPlaylist, getSongByPlaylist } from "../contoller/playlist.controller";

const router = Router();

router.post('/create-playlist', addPlaylist);
router.post('/add-song-to-playlist',addSongToPlaylist)
router.get('/get-song-by-playlist/:id',getSongByPlaylist)

export default router;