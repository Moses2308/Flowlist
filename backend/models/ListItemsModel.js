import sequelizeConn from "./config/dbConnection.js";
import { Model, DataTypes } from "sequelize";

export default class ListItems extends Model {}
ListItems.init(
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
    isChecked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeConn,
    tableName: "list_items",
  },
);
