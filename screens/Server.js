const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/glucocare", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

// (Schema)
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  phoneNumber: String,
  birthday: Date,
  diabetesType: String,
  gender: String,
  weight: Number,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      birthday,
      diabetesType,
      gender,
      weight,
      password,
    } = req.body;

    if (!email.includes("@")) {
      return res.status(400).send("Invalid Email");
    }
    if (password.length < 6) {
      return res.status(400).send("Password must be at least 6 characters");
    }

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      birthday,
      diabetesType,
      gender,
      weight,
      password, 
    });

    await newUser.save();
    res.status(201).send("Account created successfully!");

  } catch (error) {
    res.status(500).send("Error creating account");
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});