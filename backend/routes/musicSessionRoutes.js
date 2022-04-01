const express = require("express");
const {
  createMusicSession,
  endMusicSession,
  userJoinSession,
  userLeaveSession,
  fetchSession,
  updatePlaylist
} = require("../controllers/musicSessionControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(createMusicSession);
router.route("/").get(fetchSession);
router.route("/:id/join").put(protect, userJoinSession);
router.route("/:id/leave").put(protect, userLeaveSession);
router.route("/:id/playlist").put(protect, updatePlaylist);
router.route("/endSession").post( protect, endMusicSession);

module.exports = router;