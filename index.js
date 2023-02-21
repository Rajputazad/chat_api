require("dotenv").config();
require("./database/config");
var morgan = require("morgan");
const express = require("express");
const app = express();
const port = 3337;
const router = express.Router()
const chatapp = require("./app")(router);

app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:4200", "*"],
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id,authorization");

  next();
});

// const auth = require("./middleware/auth");
app.use(morgan("dev")); 

app.use("/", chatapp);

app.listen(port, () => {
  console.log(`Port = ${port} URL:-http://localhost:${port}`);
});
