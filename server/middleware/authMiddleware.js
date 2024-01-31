const jwt = require('jsonwebtoken')
require('dotenv').config({path:'../.env'})

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN)
    req.user = decoded;
    next()
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};


module.exports = {authMiddleware}