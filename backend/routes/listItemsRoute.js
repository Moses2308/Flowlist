import express from "express";
import {
  postListItem,
  getListItems,
  patchListItem,
  deleteListItem,
} from "../controllers/listItemsController.js";

const listItemsRouter = express.Router({ mergeParams: true });

listItemsRouter.post("/", postListItem);
listItemsRouter.get("/", getListItems);

listItemsRouter.patch("/:listItemId", patchListItem);
listItemsRouter.delete("/:listItemId", deleteListItem);

export default listItemsRouter;
