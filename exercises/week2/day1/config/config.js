var mysql = require('mysql2');
require('dotenv').config();

const { hostname, user_name, user_password } = process.env;

// Create connection to MySQL server (without specifying the database yet)
const con = mysql.createConnection({
  host: hostname,
  user: user_name,
  password: user_password,
  database: 'users_app'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL server!");

 /* // Create the database if it doesn't already exist
  var sql = "CREATE DATABASE IF NOT EXISTS users_app";
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Database 'users_app' created or already exists");

    // connect to database to create tables
    var con_table = mysql.createConnection({
      host: hostname,
      user: user_name,
      password: user_password,
      database: 'users_app'
    });*/
// connect to database to create tables
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected to database 'users_app'!");

      // Create the 'users' table
      const users = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(320) NOT NULL UNIQUE,
        age INT,
        role VARCHAR(255),
        isActive BOOLEAN,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`;

      con.query(users, function (err, result) {
        if (err) throw err;
        console.log("Users table created or already exists");

        // Create the 'user_images' table
        const userImages = `CREATE TABLE IF NOT EXISTS user_images (
          id INT AUTO_INCREMENT PRIMARY KEY,
          userId INT,
          imageName VARCHAR(255) NOT NULL,
          path VARCHAR(1024) NOT NULL,
          mimeType VARCHAR(100),
          extension VARCHAR(10),
          size BIGINT,
          createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        )`;

        con.query(userImages, function (err, result) {
          if (err) throw err;
          console.log("User_images table created or already exists");
        });
      });
    });
  });

// Export the connection to use in other files
module.exports = con;
