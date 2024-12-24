const Route = require("express");
const postModel = require("../model/postSchema");
const likeModel = require("../model/likeSchema");
const likeRoute = Route();

likeRoute.post("/like", async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const newlike = await likeModel.create({
      userId,
      postId,
    });
    const newPopulatedLike = await likeModel.findById(userId).populate({
      path: "likes",
      populate: {
        path: "userId",
        select: "userName profileImage",
      },
    });
    res.send(comment);
    await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        likes: newPopulatedLike,
      },
    });
    res.send(newlike);
  } catch (error) {
    res.send(error);
  }
});

module.exports = likeRoute;
