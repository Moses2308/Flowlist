import express from "express";
import User from "../models/User_model.js";
import bcrypt from "bcrypt";

const userRouter = express.Router();
//ROUTE FOR CREATING A NEW USER.
userRouter.post("/", async (req, res) => {
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

//ROUTE FOR RETRIEVING ALL USERS FROM THE DATABASE.
userRouter.get("/", async (req, res) => {
  const allUsers = await User.findAll();
  res.status(200).json({ users: allUsers });
});

//ROUTE FOR RETRIEVING A SPECIFIC USER FROM THE DATABASE.
userRouter.get("/:id", async (req, res) => {
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

//ROUTE FOR UPDATING A USER IN THE DATABASE.
userRouter.patch("/:id", async (req, res) => {
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
      (await bcrypt.compare(newPassword, targetUser.password_hash))
    ) {
      throw new Error("new values are the same as stored values");
    } else if (!oldPassword) {
      throw new Error("old password is required to update information");
    } else if (!targetUser) {
      throw new Error(`user ${targetID} not found`);
    } else if (!(await bcrypt.compare(oldPassword, targetUser.password_hash))) {
      throw new Error("incorrect password");
    }

    if (await bcrypt.compare(oldPassword, targetUser.password_hash)) {
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

//ROUTE FOR DELETING A USER FROM THE DATABASE
userRouter.delete("/:id", async (req, res) => {
  try {
    //checking if required request info is available
    if (!req.body || !req.body.password) {
      throw new Error("This request requires a password");
    } else if (!req.params) {
      throw new Error("Resource ID required");
    }

    //getting the required info from the request
    const { password } = req.body;
    const targetID = req.params.id;

    //attempt to get the resource with the specified id
    const targetUser = await User.findOne({ where: { id: targetID } });
    if (!targetUser) {
      throw new Error(`User with id ${targetID} not found`);
    }

    //variable for more readable comparisons
    const isCorrectPassword = await bcrypt.compare(
      password,
      targetUser.password_hash
    );

    //error handling for incorrect password, and action action for a correct password.
    if (!isCorrectPassword) {
      throw new Error(`Incorrect password`);
    }
    if (isCorrectPassword) {
      await targetUser.destroy();
      res.status(200).json({ status: `User ${targetID} successfully deleted` });
      return;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.send("You should not be seeing this response!");
});

export default userRouter;
