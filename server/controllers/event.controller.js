const {
  Event,
  User,
  EventAttendees,
  sequelize,
} = require("../models/index.js");
const { eventValidation } = require("../models/validators.js");
const { parseDateTime } = require("../utils/dateParse.js");
const { ZodError } = require("zod");
const { Sequelize, Op } = require("sequelize");
const {paginate} = require('../utils/paginate.js')

const getAllEvents = async (req, res) => {
  const id = req.params.id;
  const page = req.params.page ? req.params.page - 1 : 0
  let allEvents;
  try{
  if (!id) {
    allEvents = await Event.findAll({
      include: [
        { model: User, as: "organizer", attributes: ["firstName", "lastName"] },
      ],
    });
  } else {
    const user = await User.findByPk(id);
    const attendingEvents = await user.getMyEvents({
      attributes: ["id"],
    });
    const attendingEventsId = [];
    for (const event of attendingEvents) {
      attendingEventsId.push(event.id);
    }
    allEvents = await Event.findAll({
      where: {
        organizerId: {
          [Op.ne]: id,
        },
        id: {
          [Op.notIn]: attendingEventsId,
        },
      },
      include: [
        {
          model: User,
          as: "organizer",
          attributes: ["firstName", "lastName"],
        },
      ],
    });
  }
      return res.status(200).json({event_number:allEvents.length, allEvents: paginate(allEvents, page, 6 )});
}catch(err){
  return res.status(404).json({message: err.message})
}
};

const addParticipant = async (req, res) => {
  const { eventId } = req.body.data;
  const event = await Event.findByPk(eventId);
  if (!event) {
    return res.status(400).json({ message: "This event doesn't exist" });
  }
  if (!req.user) {
    return res.status(400).json({ message: "This user doesn't exist" });
  }

  try {
    await event.addAttendee(req.user.id);
    return res.status(200).json({
      success: true,
      message: `Added participation to ${event.eventName}`,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

async function getUserOrganizedEvents(req, res) {
  const user = await User.findByPk(req.user.id);
  if (!user) {
    return res.status(400).json({ message: "This user does not exist" });
  }

  try {
    const userOrganizedEvents = await user.getOrganizedEvents({
      include: [
        {
          model: User,
          as: "attendees",
          attributes: ["firstName", "lastName", "phoneNumber", "id"],
          through: { attributes: [] },
        },
      ],
    });
    return res.status(200).json(userOrganizedEvents);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function deleteEvent(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "Invalid request" });
  }

  const event = await Event.findByPk(id);
  if (event.organizerId !== req.user.id) {
    return res.status(404).json({
      message: "Only the organizer of the event can delete this event",
    });
  }
  if (!event) {
    return res.status(400).json({ message: "No event with this id" });
  }
  try {
    await event.destroy();
    res.status(200).json({ message: "Event deleted succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function createEvent(req, res) {
  req.body.eventDate = parseDateTime(req.body.eventDate);
  if (req.body.eventPicture.length === 0) {
    delete req.body.eventPicture;
  }
  try {
    eventValidation.parse(req.body);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorDetails = error.errors.map((err) => err.message + "\n");
      return res.status(401).json({ message: errorDetails });
    }
  }
  try {
    await Event.create({ ...req.body, organizerId: req.user.id });
    return res.status(200).json({ message: "Event created succesfully" });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

async function updateEvent(req, res) {
  req.body.eventDate = parseDateTime(req.body.eventDate);
  if (req.body.eventPicture.length === 0) {
    delete req.body.eventPicture;
  }

  try {
    eventValidation.parse(req.body);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorDetails = error.errors.map((err) => err.message + "\n");
      return res.status(401).json({ message: errorDetails });
    }
  }

  try {
    const event = await Event.findByPk(req.params.id);
    delete req.body.id;
    await event.update({ ...req.body });
    return res.status(201).json({ message: "Edited succesfully" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

const getAttendingEvents = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "This user does not exist" });
  }

  try {
    const attendingEvents = await user.getMyEvents();
    return res.status(200).json(attendingEvents);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const removeAttendee = async (req, res) => {
  const eventId = req.params.eventId
  const attendeeId = req.params.attendeeId
  if(!eventId || !attendeeId){
    res.status(404).json({message: 'Invalid paramas'})
  }

  try{
    const event = await Event.findByPk(eventId)
    await event.removeAttendee(attendeeId)
    res.status(201).json({message: 'Attendee removed succesfully'})
  }catch(err){
    res.status(404).json({message: err.message})
  }
}
module.exports = {
  getAllEvents,
  addParticipant,
  getUserOrganizedEvents,
  deleteEvent,
  createEvent,
  updateEvent,
  getAttendingEvents,
  removeAttendee
};
