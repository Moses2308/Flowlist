import sequelizeConn from "../config/dbConnection.js";

const SYNC_METHOD = JSON.parse(process.env.SYNC_METHOD);

sequelizeConn.sync(SYNC_METHOD);
