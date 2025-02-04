const jwt = require("jsonwebtoken");
const { users } = require("../../models/usersModel");

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

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Permission denied, admin access required" });
  }
  next();
};

const isCustomer = (req, res, next) => {
  if (req.user.role !== "customer") {
    return res
      .status(403)
      .json({ message: "Permission denied, customer access required" });
  }
  next();
};

module.exports = { verifyToken, isAdmin, isCustomer };
