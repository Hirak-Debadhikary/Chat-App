const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");

// Define a middleware function to authenticate user requests
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the request has an 'Authorization' header with a 'Bearer' token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the JWT secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

      // Find the user associated with the token and add it to the request object
      req.user = await User.findById(decoded.id).select("-password");

      // Call the next middleware function
      next();
    } catch (error) {
      // If there's an error verifying the token, return a 401 status and an error message
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // If there's no token available, return a 401 status and an error message
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No token available");
  }
});

// Export the middleware function
module.exports = { protect };
