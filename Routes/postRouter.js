const Route = require("express");
const useRoute = Route();
const postModel = require("../model/postSchema");
const userModel = require("../model/userSchema");

useRoute.post("/createPost", async (req, res) => {
  try {
    const post = await userModel.find().populate("post", "caption postImg");
    const body = req.body;
    const response = await postModel.create(body);
    await userModel.findByIdAndUpdate(body.userId, {
      $push: {
        post: response._id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = useRoute;
