import sequelizeConn from "../config/dbConnection.js";
const { Users } = sequelizeConn.models;

async function postUser(req, res) {
  const { email, password } = req.body.fields;

  const newUser = await Users.create({
    email,
    rawPassword: password,
  });

  delete newUser.dataValues.rawPassword;
  delete newUser.dataValues.passwordHash;

  res.status(201).json({
    user: newUser,
    status: "created",
  });
}

async function getUsers(req, res) {
  const users = await Users.findAll();

  const sanitizedUsers = users.map((user) => {
    delete user.dataValues.passwordHash;
    return user;
  });

  res.status(200).json({
    users: sanitizedUsers,
  });
}

async function getUserById(req, res) {
  const { userId } = req.params;

  const targetUser = await Users.findByPk(userId);
  delete targetUser.dataValues.passwordHash;

  res.status(200).json({
    user: targetUser,
  });
}

async function patchUser(req, res) {
  const { userId } = req.params;
  const { fields } = req.body;

  const targetUser = await Users.findByPk(userId);

  if (!(await targetUser.verifyPassword(fields.password))) {
    throw new Error("password does not match");
  }

  await targetUser.patchFields(fields);

  await targetUser.save();

  delete targetUser.dataValues.passwordHash;
  delete targetUser.dataValues.rawPassword;

  res.status(200).json({
    status: "updated",
    user: targetUser,
  });
}

async function deleteUser(req, res) {
  const { password } = req.body.fields;
  const { userId } = req.params;

  const targetUser = await Users.findByPk(userId);

  if (!(await targetUser.verifyPassword(password))) {
    throw new Error("password does not match");
  }

  await targetUser.destroy();

  res.status(200).json({
    user: null,
    status: "hardDeleted",
  });
}

export { getUserById, getUsers, postUser, patchUser, deleteUser };
