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

//Group Chat
const createGroupChat = asyncHandler(async (req, res) => {
  try {
    // Check if required fields are present
    if (!req.body.users || !req.body.name) {
      return res
        .status(400)
        .send({ message: "Please Fill all the required fields" });
    }

    // Parse the users JSON string
    const users = JSON.parse(req.body.users);

    // Check if there are at least two users for a group chat
    if (users.length < 2) {
      return res
        .status(400)
        .send({ message: "A group chat requires at least two users" });
    }

    // Add the admin user to the users array
    users.push(req.user);

    // Create the group chat
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    // Fetch the newly created group chat with the populated users and admin fields
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    // Return the full group chat object
    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.error("Error creating group chat:", error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

//Rename the group chat
// const renameGroup = asyncHandler(async (req, res) => {
//   const { chatId, chatName } = req.body;

//   const updatedChat = await Chat.findByIdAndUpdate(
//     chatId,
//     {
//       chatName,
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");

//   if (!updatedChat) {
//     res.status(400);
//     throw new Error("Chat not updated");
//   } else {
//     res.json(updatedChat);
//   }
// });
const renameGroup = async (req, res, next) => {
  try {
    // Extract chatId and chatName from the request body
    const { chatId, chatName } = req.body;

    // Find the chat by its Id and update the chatName field
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true } // Return the updated chat
    )
      .populate("users", "-password") // Populate the users field, excluding the password
      .populate("groupAdmin", "-password"); // Populate the groupAdmin field, excluding the password

    if (!updatedChat) {
      // If the chat is not found, return a 404 status and throw an error
      res.status(404);
      throw new Error("Chat not found");
    }

    // Return the updated chat
    res.json(updatedChat);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

//Add in a Group
// const addToGroupChat = asyncHandler(async (req, res) => {
//   const { chatId, userId } = req.body;

//   const added = await Chat.findByIdAndUpdate(
//     chatId,
//     {
//       $push: { users: userId },
//     },
//     { new: true }
//   )
//     .populate("users", "-password")
//     .populate("groupAdmin", "-password");
//   if (!added) {
//     res.status(400);
//     throw new Error("Chat not updated");
//   } else {
//     res.json(added);
//   }
// });
const addToGroupChat = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;

    // Update the chat by adding the user to the users array
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true } // Return the updated chat
    )
      .populate("users", "-password") // Populate the users field, excluding the password
      .populate("groupAdmin", "-password"); // Populate the groupAdmin field, excluding the password

    if (!added) {
      // If the chat is not found, return a 404 status and throw an error
      res.status(404);
      throw new Error("Chat not found");
    }

    // Return the updated chat
    res.json(added);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

//Remove from group chat
const removeFromGroupChat = async (req, res, next) => {
  try {
    const { chatId, userId } = req.body;

    // Update the chat by adding the user to the users array
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true } // Return the updated chat
    )
      .populate("users", "-password") // Populate the users field, excluding the password
      .populate("groupAdmin", "-password"); // Populate the groupAdmin field, excluding the password

    if (!removed) {
      // If the chat is not found, return a 404 status and throw an error
      res.status(404);
      throw new Error("Chat not found");
    }

    // Return the updated chat
    res.json(removed);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroupChat,
  removeFromGroupChat,
};
