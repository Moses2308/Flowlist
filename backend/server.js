import express from "express";
import { resetDatabase } from "./util.js";
import User from "./models/User_model.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded());
//for x-www-form-urlencoded data on every route

//TODO: CREATE A ROUTE FOR CREATING A USER
app.post("/api/v1/users", async (req, res) => {
  //destructuring newPassword & email from request body.
  let newPassword;
  let newEmail;
  try {
    newPassword = req.body.newPassword;
    newEmail = req.body.newEmail;
    if (!newPassword || !newEmail) {
      throw new Error("password OR email field Missing!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  //new local instance of a user with the provided email and password
  const newUser = User.build({ email: newEmail });
  await newUser.setPasswordHash(newPassword);

  try {
    //attempt to save local instance of user to db
    await newUser.save();
    res.status(200).json({ newUser: newUser });
    return;
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }
});

//TODO: CREATE A ROUTE FOR GETTING A SPECIFIC USER

app.get("/api/v1/users");
//TODO: CREATE A ROUTE FOR UPDATING A USER
//TODO: CREATE A ROUTE FOR DELETING A USER

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
