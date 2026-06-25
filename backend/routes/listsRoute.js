import express from "express";
import sequelizeConn from "../config/dbConnection.js";
import { where } from "sequelize";

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

//TODO: GET ALL LISTS RELATED TO THE USER
async function getLists(req, res) {
  //get id from session /json temporarily
  const { userId } = req.body.fields;

  //get all lists associated with the user
  const lists = await Lists.findAll({
    where: {
      userId,
    },
  });

  res.status(200).json({
    lists,
  });
}

async function getListById(req, res) {
  //get id from session /json temporarily
  const { userId } = req.body.fields;

  //get listId from path params
  const { listId } = req.params;

  //query for specific list where it belongs to the user
  const targetList = await Lists.findOne({
    where: {
      userId,
      id: listId,
    },
  });

  res.status(200).json({
    list: targetList,
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
