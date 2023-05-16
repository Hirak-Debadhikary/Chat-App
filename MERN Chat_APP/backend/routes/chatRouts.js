// const express = require("express");
// const { protect } = require("../middleware/authMiddleware");
// const {
//   accessChat,
//   fetchChats,
//   createGroupChat,
//   renameGroup,
//   addToGroupChat,
//   removeFromGroupChat,
// } = require("../controllers/chatControllers");

// const router = express.Router();

// router.route("/").post(protect, accessChat);
// router.route("/").get(protect, fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupadd").put(protect, addToGroupChat);
// router.route("/removegroup").put(protect, removeFromGroupChat);

// module.exports = router;

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroupChat,
  removeFromGroupChat,
} = require("../controllers/chatControllers");

const router = express.Router();

// Route to grant access to a chat
router.route("/").post(protect, accessChat);

// Route to fetch all chats
router.route("/").get(protect, fetchChats);

// Route to create a group chat
router.route("/group").post(protect, createGroupChat);

// Route to rename a group chat
router.route("/rename").put(protect, renameGroup);

// Route to add a user to a group chat
router.route("/groupadd").put(protect, addToGroupChat);

// Route to remove a user from a group chat
router.route("/removegroup").put(protect, removeFromGroupChat);

module.exports = router;
