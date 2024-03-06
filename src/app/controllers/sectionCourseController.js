const Section = require("../models/Section");
const Course = require("../models/Course");
class sectionCourseController {
  async store(req, res, next) {
    try {
      const section = await Section.create(req.body);

      const course = await Course.findByIdAndUpdate(
        req.body.courseId,
        { $push: { sections: section._id } },
        { new: true }
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
    res.status(200).json({
      message: "Đăng ký thành công",
    });
  }
}

module.exports = new sectionCourseController();
