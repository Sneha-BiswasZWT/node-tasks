
const path = require("path");
const con_table = require("../config/config");
const file_upload= require("../middleware/fileUploader")
const { createUserValidate, updateUserValidate, querySchema, updateUserSchema } = require('../validators/validators')

function home(req, res){
  return res
  .status(200)
  .json({ message: "Welcome to the User Management API!" });
}

// Insert a new user
async function createusers(req, res) {
  try {
    // Validate the request body against the schema
    await createUserSchema.validate(req.body, { abortEarly: false });

    // Destructure validated fields from the request body
    const { name, email, age, role, isActive } = req.body;

    // Insert user into the database
    const [result] = await con_table.promise().query(
      "INSERT INTO users (name, email, age, role, isActive) VALUES (?, ?, ?, ?, ?)",
      [name, email, age, role, isActive]
    );

    res.status(201).json({
      id: result.insertId,
      message: "User created successfully!",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      // Handle validation errors
      return res.status(400).json({ message: err.errors });
    }

    console.error(err);
    res.status(500).json({ message: "Error inserting user" });
  }
}
// Retrieve all users
async function getUsers(req, res) {
  try {
    const [rows] = await con_table.promise().query("SELECT * FROM users");
    res.json(rows);
    console.log("users displayed")
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
}

// Retrieve user by ID
async function getusersbyId(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Please enter user ID to proceed." });
  }

  try {
    const [rows] = await con_table.promise().query("SELECT * FROM users WHERE id = ?", [id]);
    //console.log(id)
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user" });
  }
}

// Update a user
async function updateUser(req, res) {
  const { name, email, age, role, isActive } = req.body;
  const userId = req.params.id;
  //console.log(userId);

  // Check if the ID is not provided (undefined or empty string)
  if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
  }


  const updateFields = { name, email, age, role, isActive };

  try {
   // console.log("Request Body:", req.body);  

    // Validate fields using Yup schema
    await updateUserSchema.validate(req.body, { abortEarly: false });

    const validFields = Object.entries(updateFields).filter(([_, value]) => value !== undefined && value !== null);

    if (validFields.length === 0) {
      return res.status(403).json({ error: "No parameters entered" });
    }

    const updatedFields = validFields.map(([key]) => `${key} = ?`);
    const values = validFields.map(([_, value]) => value);
    values.push(userId);

    const query = `UPDATE users SET ${updatedFields.join(", ")} WHERE id = ?`;

    const [result] = await con_table.promise().query(query, values);
    if (result.affectedRows > 0) {
      return res.json({ message: "User updated successfully!" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log("Error during validation:", err);  // Log the full error to inspect

    // Safely handle the error if it has 'errors' property
    if (err && err.errors && Array.isArray(err.errors)) {
      return res.status(400).json({ error: err.errors.join(', ') });
    }

    // Fallback error if structure doesn't match
    return res.status(400).json({ error: "Invalid request data" });
  }
}



// Delete a user
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const [result] = await con_table.promise().query("DELETE FROM users WHERE id = ?", [id]);
    if (result.affectedRows > 0) {
      res.json({ message: "User deleted successfully!" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
}

// Upload an image
async function uploadimg(req, res) {
  const userId = parseInt(req.params.id);  // Get userId from URL parameter
  const file = req.file;
  console.log(userId)
  console.log(file)

  // Check if file is uploaded
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Assuming you want to save the file path in your 'users' object (if you have one)
  userId.Image = file.path; // Save file path in the users array/object

  // Prepare the necessary details for database insertion
  const filename = file.filename;
  const imageUrl = `/uploads/${filename}`;
  const mimetype = file.mimetype;
  const size = file.size;
  const extension = path.extname(filename);

  try {
    // Insert the image details into the user_images table
    const [result] = await con_table.promise().query(
      "INSERT INTO user_images (userId, imageName, path, mimeType, extension, size, createdAt) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      [userId, filename, imageUrl, mimetype, extension, size]
    );

    // Respond with success message
    res.status(201).json({
      id: result.insertId,
      message: "Image uploaded successfully!",
      imageUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading image" });
  }
}


module.exports = {
  createusers,
  getUsers,
  getusersbyId,
  updateUser,
  deleteUser,
  uploadimg,
  home
};
