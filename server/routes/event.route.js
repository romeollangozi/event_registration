const express = require("express");
const {
  getAllEvents,
  addParticipant,
  getUserOrganizedEvents,
  deleteEvent,
  createEvent,
  updateEvent,
  getAttendingEvents,
  removeAttendee,
} = require("../controllers/event.controller.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");

const eventRoute = express.Router();

eventRoute.get("/allEvents/:page/:id?", getAllEvents);
eventRoute.post("/addParticipant", authMiddleware, addParticipant);
eventRoute.get("/userEvents", authMiddleware, getUserOrganizedEvents);
eventRoute.delete("/deleteEvent/:id", authMiddleware, deleteEvent);
eventRoute.post("/createEvent", authMiddleware, createEvent);
eventRoute.put('/updateEvent/:id', authMiddleware, updateEvent)
eventRoute.get('/attendingEvents', authMiddleware, getAttendingEvents);
eventRoute.delete('/removeAttendee/:eventId/:attendeeId', authMiddleware, removeAttendee);


module.exports = eventRoute;
