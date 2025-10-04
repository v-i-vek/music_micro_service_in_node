import { DataTypes, UUID, UUIDV4 } from "sequelize";
import sequelize from "../config/db";

export const Playlist = sequelize.define(
  "Playlist",
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references:{
        model:'users',
        key:"id"

      }
    },
    s3_thumbnail_url:{
     type:DataTypes.STRING,
    //  allowNull:false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {tableName:'playlists'}
);

