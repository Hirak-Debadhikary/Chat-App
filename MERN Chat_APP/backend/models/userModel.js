// Import Mongoose library
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define user schema
const userSchema = new mongoose.Schema(
  {
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
  },
  { timeseries: true }
);

// Compare entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  // Check if the password has been modified
  if (!this.isModified) {
    next();
  }

  // Generate a salt
  const salt = await bcrypt.genSalt(10);

  // Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);
});

// Create User model from user schema
const User = mongoose.model("User", userSchema);

// Export User model
module.exports = User;
