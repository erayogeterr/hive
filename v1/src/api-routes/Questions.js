const express = require("express");

const { getAllQuestions, getAllQuestionsInRoom } = require("../controllers/QuestionController");

const router = express.Router();

router.route("/").get(getAllQuestions);
router.route("/:roomId").get(getAllQuestionsInRoom);


module.exports = router;