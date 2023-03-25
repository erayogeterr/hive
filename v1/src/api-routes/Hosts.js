const express = require("express");
const validate = require("../middlewares/validate") // middleware
const schemas = require("../validations/Hosts") // validations
const { create, index, login} = require("../controllers/Hosts");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

//router.get("/", index);
router.route("/").get(authenticate,index); //Örneğin bir projeyi çekmek için önce authenticate'ı validate etmesi gerekir. proje yazacaksa önce authenticate, sonra validate, sonra create.
router.route("/").post(validate(schemas.createValidation), create);
router.route("/login").post(validate(schemas.loginValidation), login);

module.exports = router;