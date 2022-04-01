const asyncHandler = require("express-async-handler");
const User = require("../models/musicSessionModel");
const MusicSession = require("../models/musicSessionModel");
const generateToken = require("../config/generateToken");

const createMusicSession = asyncHandler(async (req, res) => {
  const { name, creatorId, playlist, activeUsers, isPrivate } = req.body;

  const session = await MusicSession.create({
    name,
    creatorId,
    playlist,
    activeUsers,
    isPrivate,
  });

  if (session) {
    res.status(201).json({
      _id: session._id,
      name: session.name,
      creatorId: session.creatorId,
      playlist: session.playlist,
      activeUsers: session.activeUsers,
      isPrivate: session.isPrivate,
      token: generateToken(session._id),
    });
  } else {
    res.status(400);
    throw new Error("Session could not be created");
  }
});

const fetchSession = asyncHandler(async (req, res) => {
  MusicSession.find((error, data) => {
    if (error) {
      res.status(400);
      throw new Error("Unable to fetch sessions");
    } else {
      res.status(200);
      res.json(data);
    }
  });
});

const userJoinSession = asyncHandler(async (req, res) => {
  const { sessionId, userId } = req.body;

  try{
   let result = await MusicSession.findOne({ _id: sessionId})
   result.activeUsers.push(userId);
   result.save();
   res.send("user joined session")
  } catch(error){
      console.log(error);
    throw new Error("Could not join session")
  }
});

const userLeaveSession = asyncHandler(async (req, res) => {
  const { sessionId, userId } = req.body;
  try{
    let result  = await MusicSession.findOne({ _id: sessionId });
    let index = result.activeUsers.findIndex(element => element === userId)
      result.activeUsers.splice(index, 1);
      result.save();
      res.send("user left")
  } catch(error){
    console.log(error);
    throw new Error("Could not join session")
  }
  
});

const updatePlaylist = asyncHandler( async (req, res) => {
    const { sessionId, playlist } = req.body;

    try{
        let result = await MusicSession.findOne({ _id: sessionId})
        result.activeUsers.push(playlist);
        result.save();
        res.send("playlist added")
    } catch(error){
    console.log(error);
    throw new Error("Could not join session")
    }
})

const endMusicSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  try{
    await MusicSession.findByIdAndRemove(sessionId)
    res.send("session ended")
  } catch(error){
    console.log(error);
    throw new Error("Could not join session")
  }
});

module.exports = {
  createMusicSession,
  endMusicSession,
  userJoinSession,
  userLeaveSession,
  fetchSession,
  updatePlaylist,
};
