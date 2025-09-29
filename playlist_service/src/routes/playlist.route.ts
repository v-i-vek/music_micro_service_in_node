import { Router } from "express";
import { addPlaylist,addSongToPlaylist } from "../contoller/playlist.controller";

const router = Router();

router.post('/create-playlist', addPlaylist);
router.post('/add-song-to-playlist',addSongToPlaylist)

export default router;