import { Sequelize } from "sequelize";

const sequelizeConn = new Sequelize("flowlist", "root", "2038Alaska!", {
  host: "localhost",
  dialect: "mysql",
  default: {
    timestamps: false,
  },
  logging: false,
});
export default sequelizeConn;

//await attemptConnection();

async function attemptConnection() {
  try {
    await sequelizeConn.authenticate();
    console.log("successfully connected to database!");
  } catch (error) {
    console.log("Error connecting to DBMS : ", error.message);
  }
}
