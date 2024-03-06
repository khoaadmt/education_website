const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Section = require("../models/Section");
class courseController {
  showList(req, res, next) {
    Course.find()
      .lean()
      .then((courses) => {
        res.render("courses/show-list", { courses });
      })
      .catch(next);
  }
  async show(req, res, next) {
    // Course.findOne({ slug: req.params.slug })
    //   .populate("sections")
    //   .lean()
    //   .then((course) => {
    //     res.render("courses/show", { course });
    //   })
    //   .catch(next);

    const course = await Course.findOne({ slug: req.params.slug })
      .populate("sections")
      .lean();

    if (course.sections) {
      const sectionsWithLessons = await Promise.all(
        course.sections.map(async (section) => {
          const lessons = await Lesson.find({ sectionId: section._id }).lean();
          return {
            ...section,
            lessons,
          };
        })
      );
      course.sections = sectionsWithLessons;
    }
    res.render("courses/show", { course });
  }

  //GET course/create
  create(req, res) {
    res.render("courses/create");
  }

  //POST course/create
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://i.ytimg.com/vi/${req.body.videoID}/hq720.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch((err) => {});
  }
  edit(req, res, next) {
    Course.findOne({ _id: req.params.id })
      .lean()
      .then((course) => {
        res.render("courses/edit", { course });
      })
      .catch(next);
  }
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }
  destroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  softDelete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  handleFormActions(req, res) {
    switch (req.body.action) {
      case "restore":
        Course.restore({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch();
        break;
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch();
        break;
      default:
        res.json({ message: "actions form" });
    }
  }
}

module.exports = new courseController();
