var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ZWt@2025#01"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE users_app", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});