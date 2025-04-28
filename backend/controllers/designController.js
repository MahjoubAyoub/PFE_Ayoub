const Design = require("../models/modelsDesign");

// Save a new design
exports.createDesign = async (req, res) => {
  const { shapes } = req.body;
  try {
    const design = new Design({ userId: req.user.id, shapes });
    await design.save();
    res.status(201).json(design);
  } catch (err) {
    res.status(500).json({ message: "Failed to save design" });
  }
};

// Get all designs for a user
exports.getUserDesigns = async (req, res) => {
  try {
    const designs = await Design.find({ userId: req.user.id });
    res.status(200).json(designs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch designs" });
  }
};

// Get a single design by ID
exports.getDesignById = async (req, res) => {
  try {
    const design = await Design.findById(req.params.designId);
    if (!design) return res.status(404).json({ message: "Design not found" });
    res.status(200).json(design);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch design" });
  }
};

// Update a design
exports.updateDesign = async (req, res) => {
  try {
    const updatedDesign = await Design.findByIdAndUpdate(req.params.designId, req.body, { new: true });
    res.status(200).json(updatedDesign);
  } catch (err) {
    res.status(500).json({ message: "Failed to update design" });
  }
};

// Delete a design
exports.deleteDesign = async (req, res) => {
  try {
    await Design.findByIdAndDelete(req.params.designId);
    res.status(200).json({ message: "Design deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete design" });
  }
};
