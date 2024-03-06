const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);
const Course = new Schema(
  {
    name: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name" },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoID: { type: String, require: true },
    level: { type: String },
    sections: [
      {
        type: ObjectId,
        ref: "Section",
      },
    ],
  },
  {
    timestamps: true,
  }
);

var mongoose_delete = require("mongoose-delete");
Course.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Course", Course);
