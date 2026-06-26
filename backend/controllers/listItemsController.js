import sequelizeConn from "../config/dbConnection.js";
const { Lists, ListItems } = sequelizeConn.models;

//TODO: FIND THE LIST BASED ON PARAM AND USERID && ASSOCIATE NEW LIST ITEM TO IT
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

export { postListItem };
