const User = require("../models/index.js").User;
const getUserByEmail = require("./user.controller.js").getUserByEmail;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../../.env" });
const { registerValidation } = require("../models/validators.js");
const { ZodError } = require("zod");

const registerUser = async (req, res) => {
  const saltRound = 8;
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    registerValidation.parse(req.body);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorDetails = error.errors.map((err) => err.message + " ");
      return res.status(401).json({ success: false, message: errorDetails });
    }
  }

  if (await getUserByEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "This email is already registered" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    return res
      .status(201)
      .json({ success: true, message: "User created succesfully" });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "There is no user registered with this email",
    });
  }
  if (await bcrypt.compare(password, user.password)) {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
    return res
      .status(200)
      .json({ success: true, message: "Logged in succesfully", user: payload });
  } else {
    return res.status(401).json({
      success: false,
      message: `Incorrect password for ${user.firstName} ${user.lastName}`,
    });
  }
};
module.exports = { registerUser, loginUser };
