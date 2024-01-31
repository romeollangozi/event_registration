const express = require("express");
const {
  getUserById,
  logout,
  unattend,
} = require("../controllers/user.controller.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");
const { adminMiddleware } = require("../middleware/adminMiddleware.js");

const userRoute = express.Router();

userRoute.get("/user/:id", getUserById);
userRoute.get("/logout", logout);
userRoute.delete("/unattend/:id", authMiddleware, unattend);
module.exports = userRoute;
