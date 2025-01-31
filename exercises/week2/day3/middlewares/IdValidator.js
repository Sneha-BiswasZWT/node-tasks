const { users } = require('../models/usersModel');
const { user_profiles } = require('../models/userProfilesModel');


async function userIdValidator(req, res, next) {
    const userId = req.params.userId;
    const parsedId = parseInt(userId, 10);
    // console.log(userId)

    // Check if the parsed ID is NaN (invalid number)
    if (isNaN(parsedId)) {
        return res.status(400).json({ message: 'Invalid ID format. It must be a number.' });
    }
    //console.log(userId)
    try {
        const row = await users.findAll({
            where: {
                id: userId,
            },
        });
        //console.log(row)
        if (row.length === 0) {
            return res.status(404).json({ message: 'User ID not found' });
        }

        // ID exists, continue with the request
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error checking if ID exists' });
    }


}

async function userProfileValidator(req, res, next) {
    const userId = req.params.id;
    const parsedId = parseInt(userId, 10);
    //console.log(userId)

    // Check if the parsed ID is NaN (invalid number)
    if (isNaN(parsedId)) {
        return res.status(400).json({ message: 'Invalid ID format. It must be a number.' });
    }
    //console.log(userId)
    try {
        const row = await user_profiles.findAll({
            where: {
                id: userId,
            },
        });
        //console.log(row)
        if (row.length === 0) {
            return res.status(404).json({ message: 'User profile ID not found' });
        }

        // ID exists, continue with the request
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error checking if profile ID exists' });
    }


}

module.exports = { userIdValidator, userProfileValidator };
