const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

const postModel = require("./Routes/postRouter");
const userRouter = require("./Routes/userRouter");
const commentModel = require("./Routes/commentRouter");

const dataBase = async () => {
  try {
    const a = await mongoose.connect(process.env.MONGODB_URI());
    console.log("connect to db");
  } catch (error) {
    console.log(error);
  }
};

dataBase();

app.use(postModel);
app.use(userRouter);
app.use(commentModel);

app.listen(8080, console.log("running"));
