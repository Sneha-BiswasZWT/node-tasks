const { users } = require('../models/usersModel');
const { user_profiles } = require('../models/userProfilesModel');
const { user_images } = require('../models/userImagesModel');
const path = require("path");

//home fuction
async function home(req, res) {
    return res
        .status(200)
        .json({ message: "Welcome to the User Management API!" });
}

//users table
//create new user
async function createUser(req, res) {
    const { name, age, email, role, isActive } = req.body;
    //console.log('Form Data:', req.body);

    try {
        const user = await users.create({
            name,
            age,
            email,
            role,
            isActive
        });
        res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
};

//get all users
async function getUsers(req, res) {
    try {
        const user = await users.findAll();
        console.log('Users displayed successfully!')
        res.status(201).json({ message: 'Users displayed successfully!', user });
    } catch (error) {
        console.log('Error fetching users')
        res.status(400).json({ message: 'Error fetching users', error: error.message });
    }
};

//get specific user
async function getUsersById(req, res) {
    const userId=req.params.userId;

    try {
        const user = await users.findOne({
            where: {
            id:userId,
          },});
        console.log('Users displayed successfully!')
        res.status(201).json({ message: 'Users displayed successfully!', user });
    } catch (error) {
        console.log('Error fetching users')
        res.status(400).json({ message: 'Error fetching users', error: error.message });
    }
};

//update a user
async function updateUser(req, res) {
    const userId=req.params.userId;
    const {name,age,email,role, isActive}=req.body;

    if (!name && !age && !email && !role && isActive === undefined) {
        return res.status(400).json({ message: 'No fields provided for update.' });
    }

    try {
        const [user] = await users.update(
            { name: name,
                age:age,
                email:email,
                role:role,
                isActive:isActive
             },
            {
              where: {
                id:userId,
              },
            },
          );
          const updatedUser = await users.findOne({
            where: { id: userId },
        });
        console.log('Users updated successfully!')
        res.status(201).json({ message: 'Users updated successfully!',updatedUser });
    } catch (error) {
        console.log('Error fetching users')
        res.status(400).json({ message: 'Error updating user', error: error.message });
    }
};
//delete a user
async function deleteUser(req, res) {
    const userId=req.params.userId;

    try {
        const user = await users.destroy(
            {
              where: {
                id:userId,
              },
            },
          );
        console.log('User deleted successfully!')
        res.status(201).json({ message: 'User deleted successfully!' });
    } catch (error) {
        console.log('Error fetching users')
        res.status(400).json({ message: 'Error deleting user', error: error.message });
    }
};

//user_profile table
//create a new user profile
async function createUserProfile(req, res) {
    userId=req.params.userId;
    const { bio, linkedInUrl, facebookUrl, instaUrl} = req.body;

    if (!bio && !linkedInUrl && !facebookUrl && !instaUrl) {
        return res.status(400).json({ message: 'No fields provided for create. enter atleast 1.' });
    }

    try {
        const user = await user_profiles.create({
            userId,
            bio,
            linkedInUrl, 
            facebookUrl, 
            instaUrl
        });
        res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
        if (error.name === 'SequelizeValidationError' ) {
            // Extract all validation error messages
            const validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
        }
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
};

// get all user profiles
async function getUserprofiles(req, res) {
    try {
        const user = await user_profiles.findAll();
        console.log('User profiles displayed successfully!')
        res.status(201).json({ message: 'User profiles displayed successfully!', user });
    } catch (error) {
        console.log('Error fetching users')
        res.status(400).json({ message: 'Error fetching user profiles', error: error.message });
    }
};

//get specific user Profile
async function getUserProfileById(req, res) {
    const userId=req.params.id;

    try {
        const user = await user_profiles.findOne({
            where: {
            id:userId,
          },});
        console.log('User profiles displayed successfully!')
        res.status(201).json({ message: 'User profiles displayed successfully!', user });
    } catch (error) {
        console.log('Error fetching user profiles')
        res.status(400).json({ message: 'Error fetching user profiles', error: error.message });
    }
};

//delete a user profile
async function deleteUserProfile(req, res) {
    const userId=req.params.id;

    try {
        const user = await user_profiles.destroy(
            {
              where: {
                id:userId,
              },
            },
          );
        console.log('User deleted successfully!')
        res.status(201).json({ message: 'User deleted successfully!' });
    } catch (error) {
        console.log('Error fetching users')
        res.status(400).json({ message: 'Error deleting user', error: error.message });
    }
};

//user_images table
//to uplaod an image
async function uploadImg(req, res) {
    const userId = parseInt(req.params.userId); // Get userId from URL parameter
    const file = req.file;

    console.log(userId);
    console.log(file);

    // Check if a file is uploaded
    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Prepare image details for database
    const imageName = file.filename;
    const imagePath = `/uploads/${imageName}`;
    const mimeType = file.mimetype;
    const size = file.size;
    const extension = path.extname(imageName);

    try {
        // Insert the image details into the user_images table
        const image = await user_images.create({
            userId,
            imageName,
            imagePath,
            mimeType,
            extension,
            size
        });

        // Respond with success message
        res.status(201).json({ message: "Image uploaded successfully!", image });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error uploading image", error: err.message });
    }
}
//retrieve an image
async function getImg(req, res) {
    const userId = parseInt(req.params.userId);  // Get userId from URL parameter
    console.log(userId)
    if (!userId) {
        return res.status(400).json({ error: "Please enter user ID to proceed." });
    }

    try {
        const user = await user_images.findAll({
            where: {
            id:userId,
          },});
        console.log('User Image displayed successfully!')
        res.status(201).json({ message: 'User Image displayed successfully!', user });

        //for error messages
        if (user.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: "No images found for the user." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching user images." });
    }
}

module.exports = {
    home,

    //users
    createUser,
    getUsers,
    getUsersById,
    updateUser,
    deleteUser,

    //user_profiles
    createUserProfile,
    getUserprofiles,
    getUserProfileById,
    deleteUserProfile,

    //user_images
    uploadImg,
    getImg
}
