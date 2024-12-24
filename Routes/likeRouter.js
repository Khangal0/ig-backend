const Route = require("express");
const postModel = require("../model/postSchema");
const likeRoute = Route();

likeRoute.post("/like", async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const likedPost = await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        like: userId,
      },
    });
    res.send(likedPost);
  } catch (error) {
    res.send(error);
  }
});

module.exports = likeRoute;
