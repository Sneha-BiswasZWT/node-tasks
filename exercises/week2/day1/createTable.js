var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ZWt@2025#01",
  database: "users_app"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE users  (id integer primary key auto_increment,name VARCHAR(255) not null,email VARCHAR(320) not null UNIQUE, age integer, role VARCHAR(255) , isActive BOOLEAN, createdAt TIMESTAMP not null DEFAULT NOW(), updatedAt TIMESTAMP NOT NULL DEFAULT NOW())";
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});