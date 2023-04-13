// Import Mongoose library
const mongoose = require("mongoose");

// Create a Mongoose schema for messages
const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // The sender is a required field
    },
    content: {
      type: String,
      trim: true,
      required: true, // The message content is a required field
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat", // Reference to the Chat model
      required: true, // The chat is a required field
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields to the schema
  }
);

// Create a Mongoose model for messages based on the schema
const Message = mongoose.model("Message", messageSchema);

// Export the Message model
module.exports = Message;
