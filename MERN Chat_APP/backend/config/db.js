// Require the Mongoose package and the dotenv configuration file
const mongoose = require("mongoose");
require("dotenv").config();

// Get the MongoDB connection string from the environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Define a function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Use Mongoose to connect to the MongoDB database with the connection string
    const dbConnection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log a message to the console if the connection is successful
    console.log(`Connected to MongoDB: ${dbConnection.connection.host}`);
  } catch (error) {
    // Log the error to the console if the connection fails and exit the process
    console.log(error);
    process.exit();
  }
};

// Export the connectDB function so it can be used in other parts of the application
module.exports = connectDB;
