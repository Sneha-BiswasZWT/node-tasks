const { users } = require("../../models/usersModel");
const path = require("path");
const {
  createUserSchema,
  updateUserSchema,
} = require("../utils/validators/userValidators");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

users.sync({ alter: true });

//home fuction
async function home(req, res) {
  return res
    .status(200)
    .json({ message: "Welcome to the User Management API!" });
}

//signup new user
async function signUpUser(req, res) {
  try {
    await createUserSchema.validate(req.body, { abortEarly: false });
    var { password, first_name, last_name, age, email, role } = req.body;
    console.log(req.body);

    role = role.toLowerCase();

    const user = await users.create({
      password,
      first_name,
      last_name,
      age,
      email,
      role,
    });

    return res
      .status(201)
      .json({ message: "User created successfully!", user });
  } catch (err) {
    if (err.name === "ValidationError") {
      // Handle validation
      return res.status(400).json({ message: err.errors });
    }
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await users.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "No user with this email" });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful!",
      token: token,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error logging in user", error: err.message });
  }
}

module.exports = {
  home,
  signUpUser,
  loginUser,
};
