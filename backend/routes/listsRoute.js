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
      id: listId,
      userId,
    },
  });

  res.status(200).json({
    list: targetList,
  });
}

async function patchList(req, res) {
  //get the user id from session / json temporarily,
  const { userId } = req.body.fields;

  //get the fields to update from request body
  const { title } = req.body.fields;

  //get the list id from param
  const { listId } = req.params;
  //do a update query

  const targetList = await Lists.findOne({
    where: {
      id: listId,
      userId,
    },
  });

  targetList.title = title;

  const updatedList = await targetList.save();

  //respond with the updated list
  res.status(200).json({
    status: "updated",
    list: updatedList,
  });
}

async function deleteList(req, res) {
  //get the user id from session / json temporarily,
  const { userId } = req.body.fields;
  //get the list  id from path param
  const { listId } = req.params;
  //do a soft deletion or hard deletion based on json request body
  const { hardDelete } = req.body;

  await Lists.destroy({
    where: {
      id: listId,
      userId,
    },
  });

  res.status(200).json({
    status: "hardDeleted",
    list: null,
  });
}

export default listsRouter;
