const express = require("express");
const router = express.Router();
const studyController = require("../controllers/study.controller");

router.post("/add", studyController.addStudy);
router.get("/weekly/:userId", studyController.getWeekly);

module.exports = router;