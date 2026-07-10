import passport from "passport";
import LocalStrategy from "passport-local";
import sequelizeConn from "./dbConnection.js";
const { Users } = sequelizeConn.models;

async function verify(req, email, password, result) {
  let targetUser;
  //attempt to find a user with the given email
  try {
    targetUser = await Users.findOne({
      where: {
        email: email,
      },
    });
  } catch (error) {
    //if there was a db error
    return result(error, false);
  }

  //if there was a user
  if (targetUser) {
    return result(null, targetUser);
  } else {
    return result(null, false);
  }
}

const myLocalStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passReqToCallback: true,
  },
  verify,
);

passport.serializeUser((user, report) => {
  report(null, user.id);
});

passport.deserializeUser(async (userId, report) => {
  let targetUser;
  try {
    targetUser = await Users.findByPk(userId);
  } catch (error) {
    report(error, false);
  }

  if (!targetUser) {
    report(null, false);
  } else {
    report(null, targetUser);
  }
});

export default myLocalStrategy;
