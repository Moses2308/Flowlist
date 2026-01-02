import express from "express";
import { resetDatabase } from "./util.js";
import User from "./models/User_model.js";
import bcrypt from "bcrypt";
import userRouter from "./routes/user_router.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded());

app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
