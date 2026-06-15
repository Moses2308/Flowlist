import sequelizeConn from "./config/dbConnection.js";
import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export class Users extends Model {}
Users.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      unique: true,
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    raw_password: {
      type: DataTypes.VIRTUAL,
    },
    password_hash: {
      allowNull: false,
      type: DataTypes.STRING(60), //front end validation
    },
  },
  {
    sequelize: sequelizeConn,
    tableName: "users",
    hooks: {
      beforeValidate: async (user, options) => {
        user.password_hash = await bcrypt.hash(user.raw_password, 15);
        user.raw_password = null;
      },
    },
  },
);

export class Lists extends Model {}
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

export class ListItems extends Model {}
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
