const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const multer = require("multer");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });

    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });

    const emailCheck = await User.findOne({ email });

    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    delete user.password;

    return res.json({ status: false, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    delete user.password;

    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.uploadpic = async (req, res, next) => {
  try {
    const fileName = req.file.filename;
    const userId = req.body.userId;

    console.log(req.body);

    console.log(fileName);
    console.log(userId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatarImage: fileName, isAvatarImageSet: true },
      { new: true }
    ); // to get the updated user document

    console.log(updatedUser);

    res.json({
      status: true,
      user: updatedUser,
      msg: "Image uploaded successfully",
    });
  } catch (error) {
    res.json({ msg: "Server error", status: false });
    next(error);
  }
};
