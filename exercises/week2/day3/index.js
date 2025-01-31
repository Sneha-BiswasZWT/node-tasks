const express = require("express");
const bodyParser=require("body-parser");
const app = express();
const {connectDB}=require("./config")
const port = 3000;
const apiRoutes = require("./routes/router");
const log = require("./middlewares/log")

connectDB();
// Middleware to parse JSON bodies
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));//for form data
app.use(log);
app.use("/", apiRoutes);

app.listen(port, () => {
    console.log(`\nServer is running on http://localhost:${port}`);
});