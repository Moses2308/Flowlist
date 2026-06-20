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
import usersRouter from "./routes/usersRoute.js";

const PORT = process.env.PORT;
const app = express();

//REQUEST BODY PARSERS
app.use(express.json({ type: "application/json" }));

//ROUTES
app.use("/api/v1/users", usersRouter);

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
