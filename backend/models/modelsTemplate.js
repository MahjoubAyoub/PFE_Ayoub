const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  elements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Element" }], // Linked elements
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Template", TemplateSchema);
