import express from "express";
import {
  postListItem,
  getListItems,
  patchListItem,
} from "../controllers/listItemsController.js";

const listItemsRouter = express.Router({ mergeParams: true });

listItemsRouter.post("/", postListItem);
listItemsRouter.get("/", getListItems);

listItemsRouter.patch("/:listItemId", patchListItem);

export default listItemsRouter;
