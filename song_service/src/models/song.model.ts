import { DataTypes, UUID, UUIDV4 } from "sequelize";
import sequelize from "../config/db";

export const Song = sequelize.define(
  "Song",
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
    s3_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["title"],
      },
    ],
  }
);

