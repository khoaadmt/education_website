const express = require("express");
const router = express.Router();
const courseController = require("../app/controllers/courseController");
router.get("/create", courseController.create);
router.post("/store", courseController.store);
router.post("/handle-form-actions", courseController.handleFormActions);
router.get("/:id/edit", courseController.edit);
router.put("/:id", courseController.update);
router.patch("/:id/restore", courseController.restore);
router.patch("/:id/soft-delete", courseController.softDelete);
router.delete("/:id", courseController.destroy);
router.get("/:slug", courseController.show);
router.get("/", courseController.showList);

module.exports = router;
