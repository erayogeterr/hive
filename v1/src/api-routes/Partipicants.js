const express = require("express");

const { getAllPartipicants , getAllPartipicantsInRoom } = require("../controllers/ParticipantController");

const router = express.Router();

router.route("/").get(getAllPartipicants);
router.route("/:roomId").get(getAllPartipicantsInRoom);


module.exports = router;