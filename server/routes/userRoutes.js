const {
  register,
  uploadpic,
  getAllUsers,
} = require("../contrillers/userControllers");
const { login } = require("../contrillers/userControllers");
const multer = require("multer");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

// /////////////////////////////////////////////////////////////////////////////

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/uploadpic", upload.single("image"), uploadpic);

router.get("/allusers/:id", getAllUsers);

module.exports = router;
