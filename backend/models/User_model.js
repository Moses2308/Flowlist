import sequelizeConn from "../config/dbconfig.js";
import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import List from "./List_model.js";
import ListItem from "./ListItem_model.js";

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

//dev function to help test db definition.
resetDatabase();

export default User;

//Todo: Complete the hook to salt user password on password creation
async function beforeValidate(user, options) {
  if (!user.password_hash) {
    user.password_hash = await bcrypt.hash(user.plain_password, 13);
  }
}

async function resetDatabase() {
  //attempting to drop all tables
  try {
    await ListItem.drop();
    await List.drop();
    await User.drop();
  } catch (error) {
    console.log("something went wrong dropping the tables", error.message);
  }

  // Association between User and its Lists (1:M)
  User.hasMany(List);
  List.belongsTo(User);

  // Association between List and its List items (1:M)
  List.hasMany(ListItem);
  ListItem.belongsTo(List);

  //creating tables in database, and dropping if they already exist (they shouldn't because of the earlier drops)
  await User.sync({ force: true });
  await List.sync({ force: true });
  await ListItem.sync({ force: true });

  //message to confirm success of the script.
  console.log("database reset");
}
