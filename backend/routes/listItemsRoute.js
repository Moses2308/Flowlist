import express from "express";
import { postListItem } from "../controllers/listItemsController.js";

const listItemsRouter = express.Router({ mergeParams: true });

listItemsRouter.post("/", postListItem);

export default listItemsRouter;
