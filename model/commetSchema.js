const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Posts", required: true },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comments", commentSchema);

module.exports = commentModel;
