const User = require("../models/index.js").User;
const Event = require("../models/index.js").Event;

async function getUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Event,
          as: "organizedEvents",
          include: {
            model: User,
            as: "attendees",
            attributes: ["firstName", "lastName", "phoneNumber", "id"],
            through: { attributes: [] },
          },
        },
        { model: Event, as: "myEvents" },
      ],
    });
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
}

const getStatistics = async (req, res) => {
  try {
    const totalUsers = await User.findAndCountAll();
    const totalEvents = await Event.findAll();
    let totalAttendees = 0;

    for (const event of totalEvents) {
      const attendees = await event.getAttendees()
      totalAttendees += attendees.length
    }
    return res.status(200).json({totalAttendees, totalUsers: totalUsers.count, totalEvents: totalEvents.length });
  } catch (err) {
    return res.status(404).json(err.message);
  }
};


const deleteUser = async (req, res) => {
  const userId = req.params.id;
  if(!userId){
    return res.status(404).json({message: 'Invalid query params'})
  }

  try{
    await User.destroy({
      where: {
        id: userId
      }
    })
    return res.status(201).json({message: 'User deleted succesfully'})
  }catch(err){
    return res.status(404).json({message: err.message})
  }
}

const deleteEvent = async (req, res) => {
  const id = req.params.id
  if (!id){
    return res.status(404).json({message: 'Invalid query params'})
  }

  try{
    await Event.destroy({
      where: {
        id: id
      }
    })
    return res.status(201).json({message: 'Event deleted succesfully'})
  }catch(err){
    return res.status(404).json({message: err.message})
  }
}

module.exports = { getUsers, getStatistics, deleteUser, deleteEvent };
