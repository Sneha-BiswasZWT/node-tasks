const express= require('express');
const app= express();
const mainController = require("./controller")
const apiRoutes = require("./routes/api");

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.get('/', (req,res)=>
{
    res.send("Welcome to the User Management API!")
});

//app.use(logReq);
app.use("/", apiRoutes);


port=3000;
app.listen( port,()=>{
    console.log(`Server running on http://localhost:${port}`);

})