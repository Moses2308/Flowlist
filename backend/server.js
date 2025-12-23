import express from "express";
const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
