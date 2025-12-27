import User from "./models/User_model.js";
import List from "./models/List_model.js";
import ListItem from "./models/ListItem_model.js";
import sequelizeConn from "./config/dbconfig.js";

//funciton to drop tables and reesablish them with their associations
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

async function attemptConnection() {
  try {
    await sequelizeConn.authenticate();
    console.log("successfully connected to database!");
  } catch (error) {
    console.log("Error connecting to DBMS : ", error.message);
  }
}

export { resetDatabase, attemptConnection };
