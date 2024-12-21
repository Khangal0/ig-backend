const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(cors());
app.use(express.json());
dotenv.config();

const postModel = require("./Routes/postRouter");
const userRouter = require("./Routes/userRouter");
const commentModel = require("./Routes/commentRouter");

const dataBase = async () => {
  try {
    const a = await mongoose.connect(process.env.MONGODB_URI);
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
