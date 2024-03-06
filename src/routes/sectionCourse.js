const express = require("express");
const router = express.Router();
const sectionCourseController = require("../app/controllers/sectionCourseController");
router.post("/store", sectionCourseController.store);

module.exports = router;
