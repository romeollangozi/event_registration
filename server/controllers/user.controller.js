const { User, Event } = require("../models/index.js");

async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id, {
      include: { model: Event, as: "organizedEvents" },
    });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(404).json({ success: false, error });
  }
}

async function getUserByEmail(email) {
  const user = await User.findOne({
    where: { email: email },
  });
  return user;
}

async function logout(req, res) {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 1),
    httpOnly: true,
  });
  return res.status(200).json({ success: true, message: "Logged out" });
}

async function unattend(req, res) {
  try {
    const user = await User.findByPk(req.user.id);
    await user.removeMyEvents(req.params.id);
    return res.status(200).json({ message: "Unattended succesfully" });
  } catch (err) {
    return res.status(404).json(err.message);
  }
}

module.exports = {
  getUserById,
  getUserByEmail,
  logout,
  unattend,
};
