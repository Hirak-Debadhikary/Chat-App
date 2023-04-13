// Import Mongoose library
const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  picture: {
    type: String,
    default:
      "https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png",
  },
  //   contacts: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //   ],
  //   chats: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Chat",
  //     },
  //   ],
});
// Create User model from user schema
const User = mongoose.model("User", userSchema);

// Export User model
module.exports = User;
