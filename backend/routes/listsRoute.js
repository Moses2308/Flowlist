import express from "express";
import sequelizeConn from "../config/dbConnection.js";

const { Users, Lists } = sequelizeConn.models;

const listsRouter = express.Router({ mergeParams: true });
//ROUTER
listsRouter.post("/", postList);
listsRouter.get("/", getLists);
listsRouter.get("/:listId", getListById);
listsRouter.patch("/:listId", patchList);
listsRouter.delete("/:listId", deleteList);

//ROUTE CONTROLLERS
//TODO: REMOVE USERID JSON CAPABILITIES AND USE SESSION FOR USERID INSTEAD
async function postList(req, res) {
  //get userId from session / json for now
  const { userId } = req.body.fields;

  //get title value and checklist value from request body
  const { title, isChecklist } = req.body.fields;

  //get the user and execute mixin to create list
  const targetUser = await Users.findByPk(userId);
  const newList = await targetUser.createList({ title, isChecklist });

  res.status(200).json({
    status: "created",
    list: newList,
  });
}
async function getLists(req, res) {
  res.status(200).json({
    msg: "inside getLists route",
  });
}
async function getListById(req, res) {
  res.status(200).json({
    msg: "inside getListbyId route",
  });
}
async function patchList(req, res) {
  res.status(200).json({
    msg: "inside patchList route",
  });
}
async function deleteList(req, res) {
  res.status(200).json({
    msg: "inside deleteList route",
  });
}

export default listsRouter;
