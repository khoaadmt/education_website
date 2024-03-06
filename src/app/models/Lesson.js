const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);
const Lesson = new Schema(
  {
    name: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name" },
    videoID: { type: String, require: true },
    sectionId: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

var mongoose_delete = require("mongoose-delete");
Lesson.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Lesson", Lesson);
