import sequelizeConn from "../config/dbConnection.js";
const { Lists, ListItems } = sequelizeConn.models;

//TODO: REDEFINE USERID WITH SESSIONS
async function postListItem(req, res) {
  //LIST THAT WILL BE APPENDED TO
  const { listId } = req.params;

  //REQUIRED FIELDS TO MAKE A NEW INSTANCE OF A LIST ITEM
  const { title } = req.body.fields;

  //TODO: REPLACE THIS USER ID WITH ONE BASED ON A SESSION
  const userId = process.env.USER_ID;

  //QUERY TO RETRIEVE LIST THAT BELONGS TO USER
  const targetList = await Lists.findOne({
    where: {
      id: listId,
      userId,
    },
  });

  //QUERY TO CREATE A NEW ASSOCIATED LIST ITEM
  const newListItem = await targetList.createListItem({
    title,
    isChecked: false,
  });

  //RESPONDS WITH STATUS AND NEW LIST ITEM
  res.status(200).json({
    status: "created",
    listItem: newListItem,
  });
}

//TODO: GET ALL THE LIST ITEMS ASSOCIATED WITH THE LIST
async function getListItems(req, res) {
  // THE LISTID THE ITEMS BELONG TO
  const { listId } = req.params;
  // THE USER THE LIST SHOULD BELONG TO
  const userId = process.env.USER_ID;

  const targetList = await Lists.findOne({
    where: {
      id: listId,
      userId,
    },
    include: "listItem",
  });

  const listItems = targetList.listItem;

  res.status(200).json({
    listItems,
  });
}

export { postListItem, getListItems };
