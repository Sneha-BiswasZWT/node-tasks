const jwt = require("jsonwebtoken");
require("dotenv").config();

// JWT verification middleware
function verifyToken(req, res, next) {
  const authheader = req.headers["authorization"]; // Look for token in headers
  const token = authheader && authheader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  });
}

module.exports = { verifyToken };
