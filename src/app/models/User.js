const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    local: {
      username: String,
      email: {
        type: String,
        require: true,
        index: true,
        unique: true,
        sparse: true,
      },
      avatarUrl: {
        type: String,
        require: true,
        index: true,
        unique: true,
        sparse: true,
      },
      password: String,
    },
    google: {
      googleId: String,
      name: String,
      email: String,
      avatarUrl: String,
    },
    role: {
      type: String,
      default: "member",
    },
  },
  { versionkey: false, timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
