const courses = require("../models/Course");

class meController {
  storedCourses(req, res, next) {
    let coursesQuery = courses.find({});

    if (req.query.hasOwnProperty("_sort")) {
      coursesQuery = coursesQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([
      courses.countWithDeleted({ deleted: true }),
      coursesQuery.lean(),
    ])
      .then(([deletedCount, courses]) => {
        res.render("me/stored-courses", {
          deletedCount,
          courses,
        });
      })
      .catch({});
  }
  trashCourses(req, res, next) {
    courses
      .findWithDeleted({ deleted: true })
      .lean()
      .then((courses) => {
        res.render("me/trash-courses", { courses });
      })
      .catch(next);
  }
}

module.exports = new meController();
