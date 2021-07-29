const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/index");
const morgan = require("morgan");
const path = require('path')
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.use(express.static(path.resolve(__dirname, "client", "build")));


app.use(router);


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})



async function start() {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.PORT, () => {
      console.log("server has been started...");
    });
  } catch (e) {
    console.log(e.message);
  }
}
start();
