import express from "express";
import {
  postUser,
  getUsers,
  getUserById,
  patchUser,
  deleteUser,
} from "../controllers/usersController.js";

const usersRouter = express.Router({});

usersRouter.use(express.json({ type: "application/json" }));

usersRouter.post("/", postUser);
usersRouter.get("/", getUsers);
usersRouter.get("/:userId", getUserById);
usersRouter.patch("/:userId", patchUser);
usersRouter.delete("/:userId", deleteUser);

export default usersRouter;
