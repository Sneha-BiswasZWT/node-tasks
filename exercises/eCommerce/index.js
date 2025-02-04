const express = require("express");
const app = express();
const { connectDB } = require("./config");

const port = 3000;
const authRoutes = require("./src/routes/authrouter");
const userRoutes = require("./src/routes/userRouter");

//const log = require("./middlewares/log");

connectDB();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
//app.use(log);
//app.use("/users/:id", validateId);
//app.use("/user-profile/:id", validateprofileid);
app.use("/api", userRoutes);
app.use("/api", authRoutes);

app.get("/status", (req, res) => {
  res.send("API RUNNING!");
});

app.listen(port, () => {
  console.log(`\nServer is running on http://localhost:${port}`);
});
