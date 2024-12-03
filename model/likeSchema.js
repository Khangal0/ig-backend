const { Schema, default: mongoose } = require("mongoose");

const likeSchema = new Schema({
  userId: { type: String, required: true },
  postId: { type: String, required: true },
});

const likeModel = mongoose.model("like", likeSchema);

module.exports = likeModel;
