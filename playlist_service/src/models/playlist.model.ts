import { DataTypes, UUID, UUIDV4 } from "sequelize";
import sequelize from "../config/db";

export const Playlist = sequelize.define(
  "playlists",
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
        model:'Users',
        key:"id"

      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
);

