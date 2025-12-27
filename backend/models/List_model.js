import User from "./User_model.js";
import sequelizeConn from "../config/dbconfig.js";
import { Model, DataTypes } from "sequelize";

class List extends Model {}
List.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(64),
      defaultValue: "Untitled List",
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConn,
    modelName: "List",
    timestamps: true,
    paranoid: true,
  }
);

export default List;
