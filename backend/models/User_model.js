import sequelizeConn from "../config/dbconfig.js";
import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import List from "./List_model.js";

class User extends Model {}
User.init(
  {
    id: {
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
    //removed Hook to implement in next commit
  }
);

resetDatabase();

export default User;

async function beforeValidate(user, options) {
  if (!user.password_hash) {
    user.password_hash = await bcrypt.hash(user.plain_password, 13);
  }
}

async function resetDatabase() {
  try {
    await List.drop();
    await User.drop();
  } catch (error) {
    console.log("something went wrong dropping the tables", error.message);
  }

  User.hasMany(List);
  List.belongsTo(User);

  await User.sync({ force: true });
  await List.sync({ force: true });

  console.log("database reset");
}
