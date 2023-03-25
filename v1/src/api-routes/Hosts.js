const express = require("express");
const validate = require("../middlewares/validate")
const schemas = require("../validations/Hosts")
const { create, index} = require("../controllers/Hosts")
const router = express.Router();

router.get("/", index);
router.route("/").post(validate(schemas.createValidation), create);

module.exports = router;