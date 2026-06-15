import Sequelize from "sequelize";

const { DBUSERNAME, DBPASSWORD, DBHOST, DBDIALECT } = process.env;

console.log(DBUSERNAME, DBPASSWORD, DBHOST, DBDIALECT);

const sequelizeConn = new Sequelize("flowlist", DBUSERNAME, DBPASSWORD, {
  host: DBHOST,
  dialect: "mysql",
});

try {
  await sequelize.authenticate();
  console.log("connection successful");
} catch (error) {
  console.log("error connecting to database", error.message);
}

export default sequelizeConn;
