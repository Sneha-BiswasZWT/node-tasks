const express= require('express');
require('dotenv').config();

const app= express();

app.get('/', (req,res)=>
{
    res.send("Welcome to the User Management API!")
});

port=3000;
//const port=process.env.APP_PORT
console.log(process.env.APP_PORT);
app.listen( port,()=>{
    console.log(`Server running on http://localhost:${port}`);

})