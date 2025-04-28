const mongoose = require("mongoose");

const ElementSchema = new mongoose.Schema({
  design: { type: mongoose.Schema.Types.ObjectId, ref: "Design", required: true },
  type: { type: String, enum: ["text", "image", "shape"], required: true },
  properties: { type: Object, required: true }, // Example: { color: "red", fontSize: 16 }
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Element", ElementSchema);
