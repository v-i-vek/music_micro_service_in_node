export interface IPlaylist {
  user_id: string;
  title: string;
  s3_thumbnail_url:string;
}
export interface IPlaylistSong{
    playlist_id:string,
    song_id:string
}
