import express from "express";
import sequelizeConn from "./config/dbConnection.js";
const { Users, Lists, ListItems } = sequelizeConn.models;
import usersRouter from "./routes/usersRoute.js";
import listsRouter from "./routes/listsRoute.js";

import session from "express-session";
import mySequelizeStore from "./config/sessionStore.js";
import passport from "passport";
import myLocalStrategy from "./config/passport.js";

const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;

passport.use(myLocalStrategy);
const app = express();

app.use(express.json({ type: "application/json" }));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mySequelizeStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day sid cookie
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

//login / logout routes

app.post("/api/v1/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({
    loggedIn: true,
  });
});
app.post("/api/v1/logout", async (req, res) => {
  await req.logout();
  res.status(200).json({
    isLoggedIn: false,
  });
});

app.get("/testing", (req, res) => {
  res.status(200).json({
    user: req.user,
    isLoggedIn: req.isAuthenticated,
    message: "hello world",
  });
});
// I need to implement a front end to test authentication

//ROUTES
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/lists", listsRouter);

//PATH NOT FOUND HANDLER
app.use((req, res, next) => {
  const customError = new Error("Route not found");
  customError.status = 404;
  throw customError;
});

//ERROR HANDLER
app.use("/", (error, req, res, next) => {
  res.status(error.status || 400).json({
    error: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
