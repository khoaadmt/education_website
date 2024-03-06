const express = require("express");
const router = express.Router();
const lessonController = require("../app/controllers/lessonController");

router.post("/store", lessonController.store);
module.exports = router;
