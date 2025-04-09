require("dotenv").config();
const express = require("express");
const app = express();
const workoutRoutes = require("./routes/workout");
const mongoose = require("mongoose");
const cors = require("cors");
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());
app.use(express.json());
app.use("/api/workouts", workoutRoutes);

mongoose
  .connect("mongodb://localhost:27017/MERN-app")
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
    console.log("Connected to db");
  })
  .catch((error) => {
    console.log(error);
  });
