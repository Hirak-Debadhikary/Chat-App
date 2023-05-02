// Verson 0.0.0.2
const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data.js");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/userRoutes.js");
const {
  handleNotFound,
  handleError,
} = require("./middleware/errorMiddleware.js");

const app = express();
dotenv.config(); // loads environment variables from a .env file
connectDB(); // import connectDB from config/db.js

app.use(express.json());

const PORT = process.env.PORT || 3000; // sets the server port

// Route for the root path of the API
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the API!"); // sends a response message to the client
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(handleNotFound);
app.use(handleError);

// Starts the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`); // logs a message to the console when the server starts
});
