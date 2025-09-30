import { Router } from "express";
import { addPlaylist,addSongToPlaylist, getSongByPlaylist, updatePlaylistById ,deleteSongFromPlaylist } from "../contoller/playlist.controller";

const router = Router();

router.post('/create-playlist', addPlaylist);
router.post('/add-song-to-playlist',addSongToPlaylist)
router.get('/get-song-by-playlist/:id',getSongByPlaylist)
router.patch('/update-playlist',updatePlaylistById)
router.delete('/delete-song-from-playlist',deleteSongFromPlaylist)

export default router;