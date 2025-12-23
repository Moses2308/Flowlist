import sequelizeConn from "../config/dbconfig";
import { Model, DataTypes } from "sequelize";

class User extends Model {}
User.init({
  user_id: {
    type: DataTypes.UUIDV4,
    default: DataTypes.UUIDV4,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userOptions,
});

const userOptions = {
  timestamps: false,
  modelName: "User",
};
