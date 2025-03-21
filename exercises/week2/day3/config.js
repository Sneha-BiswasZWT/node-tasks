require('dotenv').config();
const { Sequelize } = require('sequelize');

// Destructure environment variables from .env
const { hostname, user_name, user_password, database2 } = process.env;

// Initialize Sequelize with database connection details
const sequelize = new Sequelize(database2, user_name, user_password, {
  host: hostname,
  dialect: 'mysql',
  logging: false,  
});

async function connectDB() {
  try {
   
    await sequelize.authenticate();
    console.log('Database Connection has been established successfully.');

    
    await sequelize.sync({ force: false });  
    console.log('Tables synced successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, connectDB };
