const Route = require("express");
const commentModel = require("../model/commetSchema");
const postModel = require("../model/postSchema");
const useRoute = Route();

useRoute.post("/createComment", async (req, res) => {
  const { comment, userId, postId } = req.body;
  try {
    const comments = await postModel
      .find()
      .populate("userId", "comment username profileImg");
    const response = await commentModel.create({ comment, userId, postId });
    await postModel.findByIdAndUpdate(postId, {
      $push: {
        comments: response._id,
      },
    });
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

useRoute.get("/getComment/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const comment = await postModel.findById(postId).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "username profileImg",
      },
    });
    console.log(comment);
    res.send(comment);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = useRoute;
