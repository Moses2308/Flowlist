import express from "express";
import sequelizeConn from "./config/dbConnection.js";
const { Users, Lists, ListItems } = sequelizeConn.models;
import {
  getUserById,
  getUsers,
  postUser,
  patchUser,
  deleteUser,
} from "./controllers/usersController.js";

const PORT = process.env.PORT;

const app = express();

app.use(express.json({ type: "application/json" }));

app.post("/api/v1/users", postUser);

app.get("/api/v1/users", getUsers);

app.get("/api/v1/users/:userId", getUserById);

app.patch("/api/v1/users/:userId", patchUser);

app.delete("/api/v1/users/:userId", deleteUser);

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
