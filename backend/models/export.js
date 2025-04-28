const mongoose = require("mongoose");

const ExportSchema = new mongoose.Schema({
  design: { type: mongoose.Schema.Types.ObjectId, ref: "Design", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  format: { type: String, enum: ["png", "jpg", "pdf", "pptx"], required: true },
  exportedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Export", ExportSchema);
