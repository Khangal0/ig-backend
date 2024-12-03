const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: { type: String },
    post: [{ type: mongoose.Types.ObjectId, ref: "Posts" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
    followers: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
