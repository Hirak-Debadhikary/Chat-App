const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

// SignUp Route
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;

  // Check if all required fields are entered
  if (!name || !email || !password) {
    res.status(400).json({ message: "Please enter all fields" });
    return;
  }

  // Check if the user already exists in the database
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Create a new user with the provided details
  const user = await User.create({ name, email, password, picture });
  if (user) {
    // If user is created successfully, return a success response with user details and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: generateToken(user._id),
      message: "Login Successfully",
    });
  } else {
    // If user creation fails, return an error response
    res.status(400).json({ message: "Failed to Create the User" });
  }
});

// Login Route
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are entered
  if (!email || !password) {
    res.status(400).json({ message: "Please enter email and password" });
    return;
  }

  // Find the user with the provided email in the database
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    // If user is not found or password doesn't match, return an error response
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  // If user is found and password matches, return a success response with user details and token
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    picture: user.picture,
    token: generateToken(user._id),
  });
});

module.exports = { registerUser, loginUser };
