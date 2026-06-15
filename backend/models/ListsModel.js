import sequelizeConn from "../config/dbConnection.js";
import { Model, DataTypes } from "sequelize";

export default class Lists extends Model {}
Lists.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isChecklist: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: sequelizeConn,
    tableName: "lists",
  },
);
