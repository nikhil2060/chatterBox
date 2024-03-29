const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

app.use(cors());
app.use(express.json()); //middleware parses the JSON data

// app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", userRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
