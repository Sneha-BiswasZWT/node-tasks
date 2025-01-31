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
        return res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
        return res.status(400).json({ message: 'Error creating user', error: error.message });
    }
};

//get all users
async function getUsers(req, res) {
    try {
        const user = await users.findAll();
        console.log('Users displayed successfully!')
        return res.status(201).json({ message: 'Users displayed successfully!', user });
    } catch (error) {
        console.log('Error fetching users')
        return res.status(400).json({ message: 'Error fetching users', error: error.message });
    }
};

//get specific user
async function getUsersById(req, res) {
    const userId = req.params.userId;

    try {
        const user = await users.findOne({
            where: {
                id: userId,
            },
        });
        console.log('User displayed successfully!')
        return res.status(201).json({ message: 'User displayed successfully!', user });
    } catch (error) {
        console.log('Error fetching user')
        return res.status(400).json({ message: 'Error fetching user', error: error.message });
    }
};

//update a user
async function updateUser(req, res) {
    const userId = req.params.userId;
    const { name, age, email, role, isActive } = req.body;

    if (!name && !age && !email && !role && isActive === undefined) {
        return res.status(400).json({ message: 'No fields provided for update.' });
    }

    try {
        const user = await users.update(
            {
                name: name,
                age: age,
                email: email,
                role: role,
                isActive: isActive
            },
            {
                where: {
                    id: userId,
                },
            },
        );
        const updatedUser = await users.findOne({
            where: { id: userId },
        });
        console.log('Users updated successfully!')
        return res.status(201).json({ message: 'Users updated successfully!', updatedUser });
    } catch (error) {
        console.log('Error updating users')
        return res.status(400).json({ message: 'Error updating user', error: error.message });
    }
};
//delete a user
async function deleteUser(req, res) {
    const userId = req.params.userId;

    try {
        const user = await users.destroy(
            {
                where: {
                    id: userId,
                },
            },
        );
        console.log('User deleted successfully!')
        return res.status(201).json({ message: 'User deleted successfully!' });
    } catch (error) {
        console.log('Error deleting users')
        return res.status(400).json({ message: 'Error deleting user', error: error.message });
    }
};

//user_profile table
//create a new user profile
async function createUserProfile(req, res) {
    userId = req.params.userId;
    const { bio, linkedInUrl, facebookUrl, instaUrl } = req.body;

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
        return res.status(201).json({ message: 'User Profile created successfully!', user });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Extract all validation error messages
            const validationErrors = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
        }
        return res.status(400).json({ message: 'Error creating user Profile', error: error.message });
    }
};

// get all user profiles
async function getUserprofiles(req, res) {
    try {
        const user = await user_profiles.findAll();
        console.log('User profiles displayed successfully!')
        return res.status(201).json({ message: 'User profiles displayed successfully!', user });
    } catch (error) {
        console.log('Error fetching user Profiles')
        return res.status(400).json({ message: 'Error fetching user profiles', error: error.message });
    }
};

//get specific user Profile
async function getUserProfileById(req, res) {
    const userId = req.params.id;

    try {
        const user = await user_profiles.findOne({
            where: {
                id: userId,
            },
        });
        console.log('User profile displayed successfully!')
        return res.status(201).json({ message: 'User profile displayed successfully!', user });
    } catch (error) {
        console.log('Error fetching user profile')
        return res.status(400).json({ message: 'Error fetching user profile', error: error.message });
    }
};

//updating a user profile
async function updateUserProfile(req, res) {
    const userId = req.params.userId;
    const { bio, linkedInUrl, facebookUrl, instaUrl } = req.body;

    if (!bio && !linkedInUrl && !facebookUrl && !instaUrl) {
        return res.status(400).json({ message: 'No fields provided for update.' });
    }

    try {
        const user = await user_profiles.update(
            {
                bio: bio,
                linkedInUrl: linkedInUrl,
                facebookUrl: facebookUrl,
                instaUrl: instaUrl
            },
            {
                where: {
                    userId: userId,
                },
            },
        );
        const updatedUser = await user_profiles.findOne({
            where: { userId: userId },
        });
        console.log('User profile updated successfully!')
        return res.status(201).json({ message: 'User profile updated successfully!', updatedUser });
    } catch (error) {
        console.log('Error updating user profile')
        return res.status(400).json({ message: 'Error updating user profile', error: error.message });
    }
};

//delete a user profile
async function deleteUserProfile(req, res) {
    const userId = req.params.id;

    try {
        const user = await user_profiles.destroy(
            {
                where: {
                    id: userId,
                },
            },
        );
        console.log('User Profile deleted successfully!')
        return res.status(201).json({ message: 'User Profile deleted successfully!' });
    } catch (error) {
        console.log('Error deleting user Profile')
        return res.status(400).json({ message: 'Error deleting user Profile', error: error.message });
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
        return res.status(201).json({ message: "Image uploaded successfully!", image });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading image", error: err.message });
    }
}
//retrieve all images
async function getImgs(req, res) {
    try {
        const user = await user_images.findAll();
        console.log('User images displayed successfully!')
        return res.status(201).json({ message: 'User images displayed successfully!', user });
    } catch (error) {
        console.log('Error fetching user images')
        return res.status(400).json({ message: 'Error fetching user images', error: error.message });
    }
};
//retrieve an image
async function getImgById(req, res) {
    const userId = req.params.userId;  // Get userId from URL parameter
    console.log(userId)
    if (!userId) {
        return res.status(400).json({ error: "Please enter user ID to proceed." });
    }

    try {
        const user = await user_images.findOne({
            where: {
                userId: userId,
            },
        });
        console.log('User Image displayed successfully!')

        //for error messages
        if (!user) {
            return res.status(404).json({ message: "No images found for the user." });
        }
        return res.status(201).json({ message: 'User Image displayed successfully!', user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching user images." });
    }
}

//delete user image
async function deleteUserImage(req, res) {
    const userId = req.params.userId;

    try {
        const user = await user_images.destroy(
            {
                where: {
                    userId: userId,
                },
            },
        );
        console.log('User Image deleted successfully!')
        return res.status(201).json({ message: 'User Image deleted successfully!' });
    } catch (error) {
        console.log('Error deleting users Image')
        return res.status(400).json({ message: 'Error deleting user Image', error: error.message });
    }
};

//get all user details with profile and images
async function getUsersDetails(req, res) {
    const userId = req.params.userId;

    try {
        const user = await users.findOne({
            where: { id: userId },
            include: [
                {
                    model: user_profiles,
                    attributes: ['bio', 'linkedInUrl', 'facebookUrl', 'instaUrl'],
                    required: false, // LEFT JOIN behavior
                },
                {
                    model: user_images,
                    attributes: ['imageName', 'imagePath'], // Alias path as imageUrl
                    required: false, // LEFT JOIN behavior
                }
            ],
        });
        console.log('User displayed successfully!')
        return res.status(201).json({ message: 'User displayed successfully!', user });
    } catch (error) {
        console.log('Error fetching user')
        return res.status(400).json({ message: 'Error fetching user', error: error.message });
    }
};


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
    updateUserProfile,
    deleteUserProfile,

    //user_images
    uploadImg,
    getImgs,
    getImgById,
    deleteUserImage,

    getUsersDetails
    
}
