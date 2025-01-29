const express = require("express");
const app = express();
const port = 3000;
const apiRoutes = require("./routes/router");
app.use(express.urlencoded({extended : false}));//for form data

// Middleware to parse JSON bodies
app.use(express.json());


app.use("/", apiRoutes);

app.listen(port, () => {
    console.log(`\nServer is running on http://localhost:${port}`);
});