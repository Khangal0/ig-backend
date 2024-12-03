const Route = require("express");
const commentModel = require("../model/commetSchema");
const postModel = require("../model/postSchema");
const useRoute = Route();

useRoute.post("/post/comment", async (req, res) => {
  const { comment, userId, postId } = req.body;
  try {
    const response = await commentModel.create({ comment, userId, postId });
    await postModel.findByIdAndUpdate(postId, {
      $push: {
        comments: response._id,
      },
    });
    console.log(response);
    res.send(response);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = useRoute;
