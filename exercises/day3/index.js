const express= require('express');
const app= express();
const apiRoutes = require("./routes/router");
const log = require("./middlewares/log")

app.use(express.json());
//app.use(logReq);
app.use(log);
app.use(express.urlencoded({extended : false}));//for form data
app.get('/', (req,res)=>
{
    res.send("Welcome to the User Management API!")
});


app.use("/", apiRoutes);


port=3000;
app.listen( port,()=>{
    console.log(`Server running on http://localhost:${port}`);

})