const { Schema, default: mongoose } = require("mongoose");

const postSchema = new Schema({
  caption: { type: String, required: true },
  postImg: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "Users" },
  comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
  // like: [{ type: mongoose.Types.ObjectId, ref: "Likes" }],
});

const postModel = mongoose.model("Posts", postSchema);

module.exports = postModel;
