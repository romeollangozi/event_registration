const express = require("express");
const {
  getUsers,
  getStatistics,
  deleteUser,
  deleteEvent,
} = require("../controllers/admin.controller.js");
const { adminMiddleware } = require("../middleware/adminMiddleware.js");

const adminRoute = express.Router();

adminRoute.get("/getStatistics", adminMiddleware, getStatistics);
adminRoute.get("/allUsers", adminMiddleware, getUsers);
adminRoute.delete("/deleteUser/:id", adminMiddleware, deleteUser);
adminRoute.delete("/deleteEvent/:id", adminMiddleware, deleteEvent);

module.exports = adminRoute;
