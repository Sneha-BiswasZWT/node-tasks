const users = require("../../../constants")

const validateId = (req, res, next) => {
    const id = req?.params?.id;
    regex=/^\d+$/;
    if(!regex.test(id)){
        return res.status(400).json({error:`id not valid. It must be positive integer!!`});
    }
    else{
        const foundUser = users.find((user) => user.id === parseInt(id));
        if (!foundUser) {
            return res.status(400).json({error:`Could not find any user with id: ${id}`});
        }
        else {
            next();        
        }
    }
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
function validateAge(age) {
    if (typeof age === "number" && age > 0 && age < 150) {
      return true;
    } else {
      return false;
    }
  }

function validateRole(role){
    if (role.toLowerCase() === "admin" || role.toLowerCase() === "user"){
        return true;
    }else{
        return false;
    }
}
module.exports = { validateId, validateEmail, validateAge, validateRole}