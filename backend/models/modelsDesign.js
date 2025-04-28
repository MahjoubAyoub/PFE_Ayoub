const mongoose = require("mongoose");

const DesignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  shapes: { type: Array, required: true },
  elements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Element" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Design", DesignSchema);
