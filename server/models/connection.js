const mongoose = require("mongoose");

// Connection URL
const url =`mongodb+srv://mytodo:mytodo123@cluster0.skygk.mongodb.net/todoApp?retryWrites=true&w=majority`

// Use connect method to connect to the Server
const connectDB = async () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then()
    .catch();
};

module.exports = connectDB;