const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

// Accesses the chat between two users or creates a new one if it doesn't exist
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  // Find the chat between the two users if it exists
  const isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password") // Populate the users field, excluding their passwords
    .populate("latestMessage"); // Populate the latestMessage field

  // Populate the latestMessage.sender field with the sender's name, picture, and email
  await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name picture email",
  });

  if (isChat.length > 0) {
    // If the chat exists, send it back to the client
    res.send(isChat[0]);
  } else {
    // If the chat doesn't exist, create a new one
    const chatData = {
      chatName: "sender", // Set the chat name to "sender"
      isGroupChat: false,
      users: [req.user._id, userId], // Set the users field to an array of the two user IDs
    };

    try {
      const createdChat = await Chat.create(chatData);

      // Find the newly created chat and populate the users field
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(fullChat);
    } catch (error) {
      // If there's an error, send a 400 status and throw an error message
      res.status(400).send({ message: error.message });
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    // Find all chats that the current user is a part of
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      // Populate the "users" field and exclude the password field
      .populate("users", "-password")
      // Populate the "groupAdmin" field and exclude the password field
      .populate("groupAdmin", "-password")
      // Populate the "latestMessage" field
      .populate("latestMessage")
      // Sort the results by updatedAt in descending order
      .sort({ updatedAt: -1 });

    // Populate the "latestMessage.sender" field with additional user data
    const populatedChats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name picture email",
    });

    // Send the populated chats as a response
    res.status(200).send(populatedChats);
  } catch (error) {
    // If an error occurs, send a 400 status code and throw an error
    res.status(400).send({ error: error.message });
  }
});

module.exports = { accessChat, fetchChats };
