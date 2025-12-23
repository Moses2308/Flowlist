import sequelizeConn from "../config/dbconfig.js";
import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {}
User.init(
  {
    user_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      default: DataTypes.UUIDV4,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConn,
    timestamps: false,
    modelName: "User",
    hooks: {
      beforeValidate,
    },
  }
);

User.sync({ force: true });

async function beforeValidate(user, options) {
  if (!user.password_hash) {
    user.password_hash = await bcrypt.hash(user.plain_password, 13);
  }
}
