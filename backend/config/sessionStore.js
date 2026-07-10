import session from "express-session";
import generateStoreClass from "connect-session-sequelize";
import sequelizeConn from "./dbConnection.js";

const SequelizeStore = generateStoreClass(session.Store);

const mySequelizeStore = new SequelizeStore({
  db: sequelizeConn,
  expiration: 1000 * 60 * 60 * 24 * 1,
});

mySequelizeStore.sync({ alter: true });

export default mySequelizeStore;
