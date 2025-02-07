const { users } = require("../../models/usersModel");
const path = require("path");
const {
  createUserSchema,
  updateUserSchema,
} = require("../utils/validators/userValidators");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

users.sync({ alter: true });

//get all users
async function getUsers(req, res) {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await users.findAndCountAll({
      limit: limit,
      offset: offset,
    });

    // Pagination
    const totalPages = Math.ceil(count / limit);
    const paginationInfo = {
      totalUsers: count,
      totalPages: totalPages,
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };

    return res.status(200).json({
      message: "Users displayed successfully!",
      pagination: paginationInfo,
      users: rows,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
}

//get specific user
async function getUserProfile(req, res) {
  try {
    const { id } = req.user; // Access id directly from req.user
    //console.log(id);

    const user = await users.findByPk(id); // Fetch user by the id
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User displayed successfully!", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
}

//update a user
async function updateUser(req, res) {
  const { id } = req.user; // Access id directly from req.user
  const userRole = req.user.role;
  console.log(id);
  const { first_name, last_name, age, email, role } = req.body;
  let { password } = req.body;
  console.log(req.body);

  try {
    await updateUserSchema.validate(req.body, { abortEarly: false });

    //fields to update
    const updateFields = { first_name, last_name, age, email, role, password };
    const validFields = Object.entries(updateFields).filter(
      ([_, value]) => value !== undefined && value !== null
    );

    if (validFields.length === 0) {
      return res.status(403).json({ error: "No parameters entered" });
    }

    // Hash the password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
      //console.log(hashedPassword);
    }

    //console.log(updateFields.password);

    if (userRole !== "admin" && role) {
      return res.status(403).json({ error: "Unauthorized to update role" });
    }

    const user = await users.update(
      {
        first_name,
        last_name,
        age,
        email,
        password,
        role,
      },
      {
        where: {
          id: id,
        },
      }
    );

    const updatedUser = await users.findOne({
      where: { id: id },
    });
    if (user) {
      console.log("Users updated successfully!");
      return res
        .status(201)
        .json({ message: "Users updated successfully!", updatedUser });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log("Error during validation:", err);

    if (err && err.errors && Array.isArray(err.errors)) {
      return res.status(400).json({ error: err.message });
    }

    return res
      .status(400)
      .json({ message: "Error creating user", error: err.message });
  }
}

module.exports = { getUsers, getUserProfile, updateUser };
