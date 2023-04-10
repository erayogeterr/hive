const express = require("express");

const validate = require("../middlewares/validate") 
const schemas = require("../validations/Rooms")
const { create, index, getByIdRoom, deleteRoom, JoinRoom} = require("../controllers/Rooms");

const router = express.Router();

//APİ
router.route("/").get(index);
router.route("/:id").get(getByIdRoom);
router.route("/").post(validate(schemas.createValidation), create);
router.route("/:id").delete(deleteRoom);
router.route("/:id/").post(JoinRoom);


module.exports = router;