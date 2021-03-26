const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  videoURL: {
    type: String,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  likes: [{ type: ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
});

module.exports = mongoose.model("Video", videoSchema);
