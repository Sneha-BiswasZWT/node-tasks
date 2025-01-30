
const path = require("path");
const con_table = require("../config/config");
const { createUserSchema, updateUserSchema, UserProfileSchema } = require('../validators/validators')

function home(req, res) {
    return res
        .status(200)
        .json({ message: "Welcome to the User Management API!" });
}

// users table section start
// Insert a new user
async function createusers(req, res) {
    const file = req.file;
    console.log(file)

    // file details
    let pdf_name = null;
    let pdf_url = null;
    let pdf_size = null;
    // Check if file is uploaded
    if (file) {
        pdf_name = file.filename;
        pdf_url = `/uploads/${pdf_name}`;
        pdf_size = file.size;
    }


    try {
        // Validate the request body against the schema
        await createUserSchema.validate(req.body, { abortEarly: false });

        // Destructure validated fields from the request body
        const { name, email, age, role, isActive } = req.body;

        // Insert user into the database
        const [result] = await con_table.promise().query(
            "INSERT INTO users (name, email, age, role, isActive, pdf_name, pdf_url, pdf_size) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [name, email, age, role, isActive, pdf_name, pdf_url, pdf_size]
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
// Retrieve all users with image and profile
async function getUsers(req, res) {
    try {
        const [rows] = await con_table.promise().query("SELECT users.*, user_profiles.bio, user_profiles.linkedInUrl, user_profiles.facebookUrl, user_profiles.instaUrl,user_images.imageName, user_images.path AS imageUrl FROM users LEFT JOIN user_profiles ON users.id = user_profiles.userId LEFT JOIN user_images ON users.id = user_images.userId")
        if (rows.length > 0) {
            res.json(rows);
            console.log("all users displayed")
        } else {
            res.status(404).json({ message: "no user entries found" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching users" });
    }
}

// Retrieve user by ID with image and profile
async function getusersbyId(req, res) {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ error: "Please enter user ID to proceed." });
    }

    try {
        const [rows] = await con_table.promise().query("SELECT users.*, user_profiles.bio, user_profiles.linkedInUrl, user_profiles.facebookUrl, user_profiles.instaUrl,user_images.imageName, user_images.path AS imageUrl FROM users LEFT JOIN user_profiles ON users.id = user_profiles.userId LEFT JOIN user_images ON users.id = user_images.userId WHERE users.id = ?"
            , [userId]);

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
    const userId = req.params.userId;
    const file = req.file;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    // file details
    let pdf_name = null;
    let pdf_url = null;
    let pdf_size = null;
    // Check if file is uploaded
    if (file) {
        pdf_name = file.filename;
        pdf_url = `/uploads/${pdf_name}`;
        pdf_size = file.size;
    }

    try {
        // Validate fields using Yup schema
        await updateUserSchema.validate(req.body, { abortEarly: false });

        //fields to update
        const updateFields = { name, email, age, role, isActive };

        if (pdf_name && pdf_url && pdf_size) {
            updateFields.pdf_name = pdf_name;
            updateFields.pdf_url = pdf_url;
            updateFields.pdf_size = pdf_size;

        }

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
        console.log("Error during validation:", err);

        if (err && err.errors && Array.isArray(err.errors)) {
            return res.status(400).json({ error: err.errors.join(', ') });
        }

        return res.status(400).json({ error: "Invalid request data" });
    }
}


// Delete a user
async function deleteUser(req, res) {
    const userId = req.params.userId;
    try {
        const [result] = await con_table.promise().query("DELETE FROM users WHERE id = ?", [userId]);
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
// users table section end

// user_images table section start
// Upload an image
async function uploadimg(req, res) {
    const userId = parseInt(req.params.userId);  // Get userId from URL parameter
    const file = req.file;
    console.log(userId)
    console.log(file)

    // Check if file is uploaded
    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

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

//retrieve an image
async function getimages(req, res) {
    const userId = parseInt(req.params.userId);  // Get userId from URL parameter
    console.log(userId)
    if (!userId) {
        return res.status(400).json({ error: "Please enter user ID to proceed." });
    }

    try {
        // Insert the image details into the user_images table
        const [rows] = await con_table.promise().query(
            "SELECT * from user_images WHERE user_images.userId = ?;",
            [userId]
        );
        //for error messages
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: "No images found for the user." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching user images." });
    }
}

// Delete an image
async function deleteUserimage(req, res) {
    const userId = req.params.userId;
    try {
        const [result] = await con_table.promise().query("DELETE FROM user_images WHERE user_images.userId = ?", [userId]);
        if (result.affectedRows > 0) {
            res.json({ message: "image deleted successfully!" });
        } else {
            res.status(404).json({ message: "image not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting image" });
    }
}
// user_images table section end

// user_profiles table section start
//create user profile
async function createuserProfile(req, res) {
    const userId = req.params.userId;  // Get userId from URL parameter
    console.log(userId)

    if (!userId) {
        return res.status(400).json({ error: "Please enter user ID to proceed." });
    }

    const [rows] = await con_table.promise().query("SELECT * FROM user_profiles WHERE id = ?", [userId]);
    if (rows.length > 0) {
        return res.status(400).json({ error: "user profile for this userId already exists." });
    }

    try {
        // Validate the request body against the schema
        await UserProfileSchema.validate(req.body, { abortEarly: false });

        // Destructure validated fields from the request body
        const { bio, linkedInUrl, facebookUrl, instaUrl } = req.body;

        // Insert user into the database
        const [result] = await con_table.promise().query(
            "INSERT INTO user_profiles (userId, bio, linkedInUrl , facebookUrl , instaUrl) VALUES (?, ?, ?, ?, ?)",
            [userId, bio, linkedInUrl, facebookUrl, instaUrl]
        );

        res.status(201).json({
            id: result.insertId,
            message: "User_profile created successfully!",
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            // Handle validation errors
            return res.status(400).json({ message: err.errors });
        }

        console.error(err);
        res.status(500).json({ message: "Error inserting user_profile" });
    }
}
// Retrieve all user profiles
async function getUserprofiles(req, res) {
    try {
        const [rows] = await con_table.promise().query("SELECT * FROM user_profiles");
        if (rows.length > 0) {
            res.json(rows);
            console.log("all user profiles displayed")
        } else {
            res.status(404).json({ message: "no user profiles found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching user_profiles" });
    }
}
// Retrieve user profile by id
async function getuserProfilebyId(req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: "Please enter profile id to proceed." });
    }

    try {
        const [rows] = await con_table.promise().query("SELECT * FROM user_profiles WHERE id = ?", [id]);

        if (rows.length > 0) {
            res.json(rows[0]);
            console.log("user_profile displayed")
        } else {
            res.status(404).json({ message: "user_profile not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching user_profiles" });
    }
}

// Update a user profile
async function updateUserProfile(req, res) {
    const { bio, linkedInUrl, facebookUrl, instaUrl } = req.body;
    const profileId = req.params.id;

    // Check if the ID is provided
    if (!profileId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    const updateFields = { bio, linkedInUrl, facebookUrl, instaUrl };

    try {
        // Validate fields using Yup schema
        await UserProfileSchema.validate(req.body, { abortEarly: false });

        const validFields = Object.entries(updateFields).filter(([_, value]) => value !== undefined && value !== null && value !== "");

        if (validFields.length === 0) {
            return res.status(403).json({ error: "No parameters entered" });
        }

        const updatedFields = validFields.map(([key]) => `${key} = ?`);
        const values = validFields.map(([_, value]) => value);
        values.push(profileId);

        const query = `UPDATE user_profiles SET ${updatedFields.join(", ")} WHERE id = ?`;

        const [result] = await con_table.promise().query(query, values);
        if (result.affectedRows > 0) {
            console.log("User_profile updated successfully!");
            return res.json({
                message: "User_profile updated successfully!",
                updatedProfile: {
                    bio,
                    linkedInUrl,
                    facebookUrl,
                    instaUrl
                }
            });
        } else {
            return res.status(404).json({ message: "User_profile not found" });
        }
    } catch (err) {
        console.log("Error during validation:", err);  // Log the full error to inspect

        // Handle validation errors
        if (err && err.errors && Array.isArray(err.errors)) {
            return res.status(400).json({ error: `Validation failed: ${err.errors.join(', ')}` });
        }

        // Fallback error
        return res.status(400).json({ error: "Invalid request data" });
    }
}

// Delete a user profile
async function deleteUserProfile(req, res) {
    const profileId = req.params.id;
    try {
        const [result] = await con_table.promise().query("DELETE FROM user_profiles WHERE id = ?", [profileId]);
        if (result.affectedRows > 0) {
            res.json({ message: "User deleted successfully!" });
        } else {
            res.status(404).json({ message: "User_profile not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting user" });
    }
}



module.exports = {
    home,

    //join all 3 tables
    getusersbyId,

    //users
    createusers,
    getUsers,
    updateUser,
    deleteUser,

    //user_images
    uploadimg,
    getimages,
    deleteUserimage,

    //user_profile
    createuserProfile,
    getUserprofiles,
    getuserProfilebyId,
    updateUserProfile,
    deleteUserProfile
};
