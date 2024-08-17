
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../models/User.model");

// Register a new user
exports.RegisterUser = async (req, res, next) => {
  const { email, username, password, phoneNumber, profession } = req.body;

  if (phoneNumber.length !== 10) {
    return res.status(400).json({ success: false, msg: "Phone number should be 10 digits" });
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ success: false, msg: "User is already registered. Please login." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ email, username, password: hashedPassword, phoneNumber, profession });
  await newUser.save();

  return res.status(201).json({ success: true, msg: "User registered successfully" });
};

// User login
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, msg: "Email and password are required" });
  }

  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ success: false, msg: "Email not registered. Please sign up." });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ success: false, msg: "Incorrect password" });
  }

  const token = jwt.sign({ UserId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  return res.status(200).json({ success: true, msg: "User logged in successfully", token, data: user });
};

// Get all users
exports.GetAllUser = async (req, res, next) => {
  console.log("userdetailllll")
  const users = await UserModel.find();

  if (users.length === 0) {
    return res.status(404).json({ success: false, msg: "No users found" });
  }

  return res.status(200).json({ success: true, msg: "Users retrieved successfully", data: users });
};

// Get user profile
exports.GetProfile = async (req, res, next) => {
  const { UserId } = req.body;

  const user = await UserModel.findById(UserId);
  if (!user) {
    return res.status(404).json({ success: false, msg: "User not found" });
  }

  return res.status(200).json({ success: true, msg: "User profile retrieved successfully", data: user });
};

// Update user information
exports.UpdateUser = async (req, res, next) => {
  console.log("object",req.body);
  const { email, username, phoneNumber, profession, UserId } = req.body;

  const user = await UserModel.findByIdAndUpdate(
    UserId,
    {
      email: email || user.email,
      name: username || user.username,
      phoneNumber: phoneNumber || user.phoneNumber,
      profession: profession || user.profession,
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ success: false, msg: "User not found" });
  }

  return res.status(200).json({ success: true, msg: "User updated successfully", data: user });
};
