
let users = require('../../constants.js');
const validators = require('./validators/validators.js');

const validemail = validators.validateEmail;
const IdValid = validators.validateId;
const rolevalid = validators.validateRole;
const agevalid = validators.validateAge;



//list of all users & custom filtering
function getUsersfilter(req, res) {
    console.log(req.query); 
    const role = req?.query?.role;
    const isActive = req?.query?.isActive;
    const ageGt = req?.query?.ageGt;

    let filteredUsers = users;

    if (role) {
        filteredUsers = filteredUsers.filter((user) => user.role.toLowerCase() === role.toLowerCase());
    }

    if (isActive) {
        const activeFilter = isActive.toLowerCase() === "true";
        filteredUsers = filteredUsers.filter((user) => user.isActive === activeFilter);
    }

    if (ageGt) {
        const ageFilter = parseInt(ageGt);
        if (!isNaN(ageFilter)) {
            filteredUsers = filteredUsers.filter((user) => user.age > ageFilter);
        } else {
            return res.status(400).json({ error: "Invalid age parameter" });
        }
    }

    if (filteredUsers.length === 0) {
        return res.status(404).json({ message: "No users found matching the criteria." });
    }

    return res.status(200).json({ users: filteredUsers });
}
//list of user of particular ID
function getusersbyId(req, res) {
    const id = parseInt(req.params.id);

    const found = users.find((user) => user.id === id);
    if (found) {
        return res.status(200).json(found);
    }
    else {
        return res.status(404).json({ message: `No user found with id: ${id}.` })
    }

}
//create new users
function createusers(req, res) {
    let { name, email, age, role, isActive } = req.body;
    age = parseInt(age);
    isActive = Boolean(isActive);

    //const emailvalid = users.find((user) => user.email === email)
    //console.log(emailvalid)

    if (!name || !email || !age || !role || !isActive) {
        res.status(403).json({
            error:
                "Please Give All Fields To Create User: Name, Email, Age, Role, isActive",
        });
    }
    //else if(!emailvalid){
    //return res.status(404).json({message: `User already exists with this email Id: ${email}.`})
    //}
    else if (!(validemail(email))) {
        return res.status(404).json({ message: `Please enter valid Email Id` });
    } else if (!(rolevalid(role))) {
        return res.status(404).json({ message: `Invalid role, available roles are: Admin, User` });
    } else if (!(agevalid(age))) {
        return res.status(404).json({ message: `Please enter valid age` });
    } else {
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1; // checks for last Id 
        const newuser = { id, name, email, age, role, isActive };
        users.push(newuser);
        return res.status(201).json({ message: `New user Created with id: ${id}, name: ${name}, email: ${email}, age: ${age}, role: ${role}` });

    }

}

//update user
function updateUser(req, res) {
    const id = parseInt(req.params.id);
    if (!id) {
        return res.status(403).json({ error: "Please enter user id to proceed." });
    }

    let { name, email, age, role, isActive } = req.body;

    if (!name && !email && !age && !role && isActive === undefined) {
        return res.status(403).json({ error: "No parameters entered" });
    }

    const foundUser = users.find((user) => user.id === id);

    if (foundUser) {
        const updates = { name, email, age, role, isActive }; 
        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined) {
                foundUser[key] = value;
            }
        }

        return res.status(200).json({ message: "User Updated", user: foundUser });
    } else {
        return res.status(404).json({ error: "User not found" });
    }
}

function deleteUser(req, res) {
    const id = parseInt(req.params.id);
    if (!id) {
        res.status(403).json({ error: "Please enter user id to proceed." });
    }
    const foundUser = users.find((user) => user.id === id);

    // Check if user exists
    if (!foundUser) {
        return res.status(404).json({ error: "User not found." });
    }

    // Create a new array excluding the user with the given ID
    const updatedUsers = users.filter((user) => user.id !== id);

    // Reassign the updated array back to the users variable
    users = updatedUsers;

    // Respond with success
    return res.status(200).json({
        message: "User deleted successfully.",
        user: foundUser,
    });
}
function uploadimg(req, res) {
    const id = parseInt(req.params.id);
    const file = req.file;
  
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
  
    const index = users.findIndex((user) => user.id === id);
  
    if (index === -1) {
      return res.status(404).json({ error: `User with ID ${id} not found.` });
    }
  
    users[index].Image = file.path; // Save file path
    return res.status(200).json({
      message: "File upload successful",
      data: { userId: id, filePath: file.path },
    });}

module.exports = {
    getUsersfilter,
    getusersbyId,
    createusers,
    updateUser,
    deleteUser,
    uploadimg,
    
   
};