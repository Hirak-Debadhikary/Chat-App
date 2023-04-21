// Import the jsonwebtoken library
const jwt = require("jsonwebtoken");

// Define a function that generates a JWT token with the given user ID
const generateToken = (id) => {
  // Sign the user ID into a JWT token using a secret token and an expiration time of 7 days
  const token = jwt.sign({ id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: "7days",
  });
  return token; // Return the generated token
};

// Export the generateToken function to be used by other parts of the application
module.exports = generateToken;
