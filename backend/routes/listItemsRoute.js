import express from "express";
import {
  postListItem,
  getListItems,
} from "../controllers/listItemsController.js";

const listItemsRouter = express.Router({ mergeParams: true });

listItemsRouter.post("/", postListItem);
listItemsRouter.get("/", getListItems);

export default listItemsRouter;
