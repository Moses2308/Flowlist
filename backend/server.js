import express from "express";
import { resetDatabase } from "./util.js";
import User from "./models/User_model.js";
import bcrypt from "bcrypt";

const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded());
//for x-www-form-urlencoded data on every route

//A ROUTE FOR CREATING A USER
app.post("/api/v1/users", async (req, res) => {
  //destructuring newPassword & email from request body.
  let newPassword;
  let newEmail;
  try {
    newPassword = req.body.newPassword;
    newEmail = req.body.newEmail;
    if (!newPassword || !newEmail) {
      throw new Error("password OR email field missing!");
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

//A ROUTE FOR GETTING ALL USERS
app.get("/api/v1/users", async (req, res) => {
  const allUsers = await User.findAll();
  res.status(200).json({ users: allUsers });
});
//A ROUTE FOR GETTING A SPECIFIC USER BY ID
app.get("/api/v1/users/:id", async (req, res) => {
  const targetID = req.params.id;
  const targetUser = await User.findOne({
    where: {
      id: targetID,
    },
  });
  if (!targetUser) {
    res.status(404).json({ error: `could not find user with ID ${targetID}` });
    return;
  }
  res.status(200).json({ user: targetUser });
  return;
});
//TODO: CREATE A ROUTE FOR UPDATING A USER
app.patch("/api/v1/users/:id", async (req, res) => {
  const targetID = req.params.id;
  const { newEmail, newPassword, oldPassword } = req.body;
  console.log(targetID, newEmail, newPassword, oldPassword);

  //no new values for the fields
  //no old password  provided
  //no user was found

  try {
    const targetUser = await User.findOne({ where: { id: targetID } });

    //check if the submitted values are new, if an old password was provided, and if a user was found
    if (
      newEmail === targetUser.email &&
      bcrypt.compare(newPassword, targetUser.password_hash)
    ) {
      throw new Error("new values are the same as stored values");
    } else if (!oldPassword) {
      throw new Error("old password is required to update information");
    } else if (!targetUser) {
      throw new Error(`user ${targetID} not found`);
    } else if (!(await bcrypt.compare(oldPassword, targetUser.password_hash))) {
      throw new Error("incorrect password");
    }

    if (bcrypt.compare(oldPassword, targetUser.password_hash)) {
      let fieldString = "Updated the following fields: ";
      if (newPassword && newPassword !== oldPassword) {
        await targetUser.setPasswordHash(newPassword);
        fieldString += "password, ";
      }
      if (newEmail && newEmail !== targetUser.email) {
        targetUser.email = newEmail;
        fieldString += "email ";
      }
      await targetUser.save();
      res.status(200).json({ status: fieldString });
      return;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.send("You should not be seeing this response!");
});

//TODO: CREATE A ROUTE FOR DELETING A USER
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
