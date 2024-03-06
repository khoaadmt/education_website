const Lesson = require("../models/Lesson");
class lessonController {
  //GET course/create

  //POST course/create
  async store(req, res, next) {
    const formData = req.body;
    try {
      const lesson = await Lesson.create(formData);
      if (!lesson) {
        res.status(500).json({
          message: "Tạo bài học thất bại",
        });
      } else {
        res.status(200).json({
          message: "Tạo bài học thành công",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

module.exports = new lessonController();
