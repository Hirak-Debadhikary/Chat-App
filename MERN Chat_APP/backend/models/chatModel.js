const mongoose = require("mongoose");

// Define the chat schema
const chatSchema = mongoose.Schema(
  {
    // The name of the chat
    chatName: {
      type: String,
      trim: true,
    },
    // Whether or not the chat is a group chat
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    // The users in the chat
    users: [
      {
        type: mongoose.Schema.Types.Object,
        ref: "User",
      },
    ],
    // The latest message in the chat
    latestMessage: {
      type: mongoose.Schema.Types.Object,
      ref: "Message",
    },
    // The admin of the chat (if it is a group chat)
    groupAdmin: {
      type: mongoose.Schema.Types.Object,
      ref: "User",
    },
  },
  // Add timestamps for when the chat was created and updated
  {
    timestamps: true,
  }
);

// Create a Chat model based on the schema
const Chat = mongoose.model("Chat", chatSchema);

// Export the Chat model
module.exports = Chat;
