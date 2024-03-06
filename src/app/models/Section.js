const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Section = new Schema(
  {
    name: { type: String, required: true },
    order: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Section", Section);
