import Sequelize from "sequelize";

import defineUsers from "../models/UsersModel.js";
import defineLists from "../models/ListsModel.js";
import defineListItems from "../models/ListItemsModel.js";

import defineAssociations from "./associations.js";

//ENVIRONMENT VARIABLES
const { DBUSERNAME, DBPASSWORD, DBHOST, DBDIALECT } = process.env;

//CONNECTION DEFINITION
const sequelizeConn = new Sequelize("flowlist", DBUSERNAME, DBPASSWORD, {
  host: DBHOST,
  dialect: "mysql",
});

//MODEL DEFINITIONS
defineUsers(sequelizeConn);
defineLists(sequelizeConn);
defineListItems(sequelizeConn);

//ASSOCIATIONS DEFINITION
defineAssociations(sequelizeConn);

//CONNECTION ATTEMPT TO DB
try {
  await sequelizeConn.authenticate();
  console.log("connection successful");
} catch (error) {
  console.log("error connecting to database", error.message);
}

export default sequelizeConn;
