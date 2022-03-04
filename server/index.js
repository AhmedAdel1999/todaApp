
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
//const mongodb = require("./models/connection");
const handle = require("./handlers");
const route = require("./routes");
const auth = require("./middlewares/auth");

const app = express();
//mongodb();



app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/", route.auth);
app.use(auth);
app.use("/api", route.todo);

app.use((req, res, next) => {
  let err = new Error("not Found");
  err.status = 404;
  next(err);
});
app.use(handle.error);
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
.then()
.catch();
app.listen(process.env.PORT || 5001, () => {
});
