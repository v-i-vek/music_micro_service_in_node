import { DataTypes, UUID, UUIDV4 } from "sequelize";
import sequelize from "../config/db";

export const PlaylistSong = sequelize.define("Playlist_song", {

    id:{
      type:DataTypes.UUID,
      allowNull:false,
      defaultValue:UUIDV4,
      primaryKey:true  
    },
  playlist_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "playlists",
      key: "id",
    },
  },
  song_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "songs",
      key: "id",
    },
  },
  
},{
  tableName:"playlist_songs"
});
