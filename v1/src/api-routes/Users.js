const express = require("express");
const validate = require("../middlewares/validate") // middleware
const schemas = require("../validations/Users") // validations
const { create, index, login, resetPassword, update, deleteHost, changePassword, updateProfileImage} = require("../controllers/Users");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.route("/").get(index);
router.route("/").post(validate(schemas.createValidation), create);
router.route("/login").post(validate(schemas.loginValidation), login);
router.route("/").patch(authenticate, validate(schemas.updateValidation), update);
router.route("/:id").delete(authenticate, deleteHost);
router.route("/reset-password").post(validate(schemas.resetPasswordValidation),resetPassword);
router.route("/change-password/:id").put(authenticate ,validate(schemas.changePasswordValidation),changePassword);
router.route("/update-profile-image").post(authenticate, updateProfileImage);

module.exports = router;