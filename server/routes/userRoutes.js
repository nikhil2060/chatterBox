const { register } = require("../contrillers/userControllers");
const { login } = require("../contrillers/userControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
