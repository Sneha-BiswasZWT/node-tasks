CREATE DATABASE users_app;
USE users_app;

CREATE TABLE users(
    id integer primary key auto_increment, 
    name VARCHAR(255) not null,
    email VARCHAR(320) not null UNIQUE, 
    age integer, 
    role VARCHAR(255) , 
    isActive BOOLEAN, 
    createdAt TIMESTAMP not null, 
    updatedAt TIMESTAMP
)