const mongoose = require("mongoose");

const CollaborationSchema = new mongoose.Schema({
  design: { type: mongoose.Schema.Types.ObjectId, ref: "Design", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, enum: ["editor", "viewer"], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Collaboration", CollaborationSchema);
