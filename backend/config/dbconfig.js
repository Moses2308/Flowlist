import { Sequelize } from "sequelize";

//THIS FILE ESTABLISH A CONNECTION TO THE DBMS
const sequelizeConn = new Sequelize("flowlist", "root", "2038Alaska!", {
  host: "localhost",
  dialect: "mysql",
  default: {
    timestamps: false,
  },
  logging: false,
});

export default sequelizeConn;
