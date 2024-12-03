const Route = require("express");
const useRouter = Route();
const userModel = require("../model/userSchema");

useRouter.post("/signup", async (req, res) => {
  try {
    // const hashPassword = bcrypt.hash(password, 5);
    // const { password } = body;
    const body = req.body;
    const response = await userModel.create(body);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

useRouter.get("/user/post", async (req, res) => {
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
