const { idSchema } = require('./validators');
const con_table = require('../config/config');
const yup= require('yup');

async function userIdValidator(req, res, next) {
    const userId = req.params.userId;
    const parsedId = parseInt(userId, 10);

    // Check if the parsed ID is NaN (invalid number)
    if (isNaN(parsedId)) {
        return res.status(400).json({ message: 'Invalid ID format. It must be a number.' });
    }
    //console.log(userId)
    try {
        // Validate the userId
        await idSchema.validate({ id: userId });

        const [rows] = await con_table.promise().query("SELECT id FROM users WHERE id = ?", [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User ID not found' });
        }

        // ID exists, continue with the request
        next();
    } catch (err) {
        // If the validation fails
        if (err instanceof yup.ValidationError) {
            return res.status(400).json({ message: err.errors[0] });
        }

        // Handle any other errors
        console.error(err);
        return res.status(500).json({ message: 'Error checking if ID exists' });
    }


}

async function userProfileValidator(req, res, next) {
    const userId = req.params.id;
    const parsedId = parseInt(userId, 10);

    // Check if the parsed ID is NaN (invalid number)
    if (isNaN(parsedId)) {
        return res.status(400).json({ message: 'Invalid ID format. It must be a number.' });
    }
    //console.log(userId)
    try {
        // Validate the userId
        await idSchema.validate({ id: userId });

        const [rows] = await con_table.promise().query("SELECT id FROM user_profiles WHERE id = ?", [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User profile ID not found' });
        }

        // ID exists, continue with the request
        next();
    } catch (err) {
        // If the validation fails
        if (err instanceof yup.ValidationError) {
            return res.status(400).json({ message: err.errors[0] });
        }

        // Handle any other errors
        console.error(err);
        return res.status(500).json({ message: 'Error checking if ID exists' });
    }


}

module.exports = {userIdValidator, userProfileValidator};
