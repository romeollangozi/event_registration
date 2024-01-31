const jwt = require('jsonwebtoken')

const adminMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (decoded.isAdmin) {
      next();
    } else {
      return res.status(401).json({ message: "No admin privileges" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = {adminMiddleware};
