const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: { type: String, required: true },
    userId: { type: String, required: true },
    postId: { type: String, required: true },
    username: { type: String, ref: "Users" },
    profileImg: { type: String, ref: "Users" },
  }
  //   { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
