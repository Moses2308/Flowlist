import express from "express";
import sequelizeConn from "./config/dbConnection.js";
const PORT = process.env.PORT;

const { Users, Lists, ListItems } = sequelizeConn.models;
const app = express();

app.use(express.json({ type: "application/json" }));

app.post("/api/v1/users", async (req, res) => {
  const { email, password } = req.body.fields;

  const newUser = Users.build({
    email,
    rawPassword: password,
  });

  try {
    await newUser.save();
  } catch (error) {
    res.status(400).json({
      msg: "error saving user to the database",
      error: error.message,
    });
    return;
  }

  delete newUser.dataValues.rawPassword;
  delete newUser.dataValues.passwordHash;

  res.status(200).json({
    user: newUser,
    action: "created",
  });
});

app.get("/api/v1/users", (req, res) => {
  res.send(`IMPLEMENT: route to get "all" users with pagination.`);
});

app.get("/api/v1/users/:userId", (req, res) => {
  res.send(`IMPLEMENT: route to get a specific user`);
});

app.patch("/api/v1/users/:userId", (req, res) => {
  res.send(`IMPLEMENT: route to update a user's fields`);
});
app.delete("/api/v1/users/:userId", (req, res) => {
  res.send(`IMPLEMENT: route to delete a user`);
});

//catch all error handler
// app.use((req, res, next) => {
//   const customError = new Error("Path not found");
//   customError.status = 404;
//   throw customError;
// });
// app.use("/", (error, req, res, next) => {
//   res.status(error.status).send(error.message);
// });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
