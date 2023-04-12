// Verson 0.0.0.1

// const express = require("express");
// const dotenv = require("dotenv");

// const { chats } = require("./data/data.js");

// const app = express();
// dotenv.config();

// const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Welcome");
// });

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   //   console.log(req.params.id);
//   const signleChat = chats.find((chat) => chat._id === req.params.id);
//   res.send(signleChat);
// });

// app.listen(PORT, console.log(`listening on port ${PORT}`));

// Verson 0.0.0.2
const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data.js");

const app = express();
dotenv.config(); // loads environment variables from a .env file

const PORT = process.env.PORT || 3000; // sets the server port

// Route for the root path of the API
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the API!"); // sends a response message to the client
});

// Route for retrieving all chats
app.get("/api/chat", (req, res) => {
  res.status(200).json(chats); // sends a JSON response containing all chats
});

// Route for retrieving a single chat by ID
app.get("/api/chat/:id", (req, res) => {
  const chat = chats.find((chat) => chat._id === req.params.id); // searches for the chat with the specified ID
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" }); // sends a 404 response if chat not found
  }
  res.status(200).json(chat); // sends a JSON response containing the chat
});

// Starts the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`); // logs a message to the console when the server starts
});
