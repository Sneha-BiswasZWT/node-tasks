const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

//connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ZWt@2025#01",
  database: "users_app",
});

// Middleware to parse JSON bodies
app.use(express.json());

//app.use(express.urlencoded({extended : false}));//for form data

// Insert a new user
app.post("/users", async (req, res) => {
  const { name, email, age, role, isActive } = req.body;
  try {
    const [result] = await pool.promise().query(
      "INSERT INTO users (name, email, age, role, isActive) VALUES (?, ?, ?, ?, ?)",
      [name, email, age, role, isActive]
    );
    res.status(201).json({ id: result.insertId, message: "User created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error inserting user" });
  }
});

// Retrieve all users
app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.promise().query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});


// Retrieve users by ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Please enter user id to proceed." });
  }

  try {

    const query = `SELECT * FROM users WHERE id = ?`;

    const [result] = await pool.promise().query(query, [id]);

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user" });
  }
});

// Update a user
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age, role, isActive } = req.body;

  if (!id) {
    return res.status(403).json({ error: "Please enter user id to proceed." });
  }

  const updateFields = {
    name,
    email,
    age,
    role,
    isActive
  };

  const validFields = Object.entries(updateFields).filter(([key, value]) => value !== undefined && value !== null);

  if (validFields.length === 0) {
    return res.status(403).json({ error: "No parameters entered" });
  }

  const updatedFields = validFields.map(([key, value]) => `${key} = ?`);
  const values = validFields.map(([key, value]) => value);

  values.push(id);

  const query = `UPDATE users SET ${updatedFields.join(", ")} WHERE id = ?`;

  try {
    const [result] = await pool.promise().query(query, values);

    if (result.affectedRows > 0) {
      res.json({ message: "User updated successfully!" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user" });
  }
});


// Delete a user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.promise().query("DELETE FROM users WHERE id = ?", [id]);
    if (result.affectedRows > 0) {
      res.json({ message: "User deleted successfully!" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
