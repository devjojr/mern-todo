const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "5d" });
};

// sign up a user
const signUpUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const user = await User.signup(userName, email, password);

    // create a token
    const token = generateToken(user._id);

    res.status(200).json({ userName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// log in a user
const logInUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.login(userName, password);

    const token = generateToken(user._id);

    res.status(200).json({ userName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signUpUser, logInUser };
