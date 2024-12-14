const Route = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const useRouter = Route();
const userModel = require("../model/userSchema");
const authMiddleware = require("../auth-middleware");

useRouter.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const { password, username, email } = body;
    const hashPassword = await bcrypt.hash(password, 10);
    const response = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        userId: response._id,
        username: response.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.send({ token });
  } catch (error) {
    throw new Error(error);
  }
});

useRouter.get("/user/post", authMiddleware, async (req, res) => {
  try {
    const post = await userModel.find().populate("post", "caption postImg");

    res.send(post);
  } catch (error) {
    res.send(error);
  }
});

useRouter.post("/user/follow", async (req, res) => {
  try {
    const { followingUserId, followersUserId } = req.body;
    const response = await userModel.findByIdAndUpdate(followersUserId, {
      $addToSet: {
        followers: followingUserId,
      },
    });
    await userModel.findByIdAndUpdate(followingUserId, {
      $addToSet: {
        following: followersUserId,
      },
    });
    res.send("done");
  } catch (error) {
    res.send(error);
  }
});

useRouter.delete("/user/unfollow", async (req, res) => {
  try {
    const body = req.body;
    const response = await userModel.findByIdAndDelete(body.followers);
    await userModel.findByIdAndDelete(body.following);
    console.lof(response);
    res.send("done");
  } catch (error) {
    res.send(error);
  }
});

module.exports = useRouter;
