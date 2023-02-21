const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// sign up new user, using signup statics
userSchema.statics.signup = async function (userName, email, password) {
  if (!userName || !email || !password) {
    throw Error("Error: invalid form");
  }
  if (!validator.isAlphanumeric(userName)) {
    throw Error("Invalid user name");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Invalid password");
  }

  // check if username is currently in use
  const userNameInUse = await this.findOne({ userName });
  if (userNameInUse) {
    throw Error("Username currently in use");
  }

  // check if email is currently in use
  const emailInUse = await this.findOne({ email });
  if (emailInUse) {
    throw Error("Email currently in use");
  }

  // generate salt and hash with password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ userName, email, password: hash });

  return user;
};

// log in user, using login statics
userSchema.statics.login = async function (userName, password) {
  if (!userName || !password) {
    throw Error("Invalid username and password");
  }

  const user = await this.findOne({ userName });

  if (!user) {
    throw Error("Invalid username");
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    throw Error("Invalid password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
