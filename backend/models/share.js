const mongoose = require("mongoose");

const ShareSchema = new mongoose.Schema({
  design: { type: mongoose.Schema.Types.ObjectId, ref: "Design", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  platform: { type: String, enum: ["facebook", "twitter", "instagram"], required: true },
  sharedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Share", ShareSchema);
