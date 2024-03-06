const siteRouter = require("./site");
const newsRouter = require("./news");
const coursesRouter = require("./courses");
const lessonRouter = require("./lesson");
const sectionCourseRouter = require("./sectionCourse");
const meRouter = require("./me");
const authRouter = require("./auth");
function route(app) {
  app.use("/courses", coursesRouter);
  app.use("/lesson", lessonRouter);
  app.use("/section-courses", sectionCourseRouter);
  app.use("/auth", authRouter);
  app.use("/news", newsRouter);
  app.use("/me", meRouter);
  app.use("/", siteRouter);
}
module.exports = route;
