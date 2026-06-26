import express from "express";
import sequelizeConn from "../config/dbConnection.js";
import {
  postList,
  getLists,
  getListById,
  patchList,
  deleteList,
} from "../controllers/listsController.js";
import listItemsRouter from "./listItemsRoute.js";

const { Users, Lists } = sequelizeConn.models;

const listsRouter = express.Router({ mergeParams: true });
//ROUTER
listsRouter.post("/", postList);
listsRouter.get("/", getLists);
listsRouter.get("/:listId", getListById);
listsRouter.patch("/:listId", patchList);
listsRouter.delete("/:listId", deleteList);

listsRouter.use("/:listId/listItems", listItemsRouter);

export default listsRouter;
