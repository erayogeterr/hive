const express = require("express");
const validate = require("../middlewares/validate") // middleware
const schemas = require("../validations/Hosts") // validations
const { create, index, login, resetPassword, update, deleteHost} = require("../controllers/Hosts");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

//router.get("/", index);
//router.route("/").get(authenticate,index); //Örneğin bir projeyi çekmek için önce authenticate'ı validate etmesi gerekir. proje yazacaksa önce authenticate, sonra validate, sonra create.
router.route("/").get(index);
router.route("/").post(validate(schemas.createValidation), create);
router.route("/login").post(validate(schemas.loginValidation), login);
router.route("/").patch(authenticate, validate(schemas.updateValidation), update);
router.route("/reset-password").post(validate(schemas.resetPasswordValidation),resetPassword);
router.route("/:id").delete(authenticate, deleteHost);

module.exports = router;