import sequelizeConn from "../config/dbconfig.js";
import { Model, DataTypes } from "sequelize";

class ListItem extends Model {}
ListItem.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING(64),
      defaultValue: "untitled task",
      allowNull: true, //might need to change this in the future
    },
  },
  {
    sequelize: sequelizeConn,
    modelName: "ListItem",
    timestamps: true,
    paranoid: true, //look into cron jobs to periodically delete "deleted" items
  }
);

export default ListItem;
