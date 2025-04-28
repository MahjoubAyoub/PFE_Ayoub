const Element = require("../models/modelsElement");

// Create a new element
exports.createElement = async (req, res) => {
  try {
    const { design, type, properties } = req.body;
    const newElement = new Element({ design, type, properties });
    await newElement.save();
    res.status(201).json(newElement);
  } catch (error) {
    res.status(500).json({ message: "Error creating element" });
  }
};

// Get all elements
exports.getAllElements = async (req, res) => {
  try {
    const elements = await Element.find();
    res.status(200).json(elements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching elements" });
  }
};

// Get a single element by ID
exports.getElementById = async (req, res) => {
  try {
    const element = await Element.findById(req.params.id);
    if (!element) return res.status(404).json({ message: "Element not found" });

    res.status(200).json(element);
  } catch (error) {
    res.status(500).json({ message: "Error fetching element" });
  }
};

// Update an element
exports.updateElement = async (req, res) => {
  try {
    const updatedElement = await Element.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedElement) return res.status(404).json({ message: "Element not found" });

    res.status(200).json(updatedElement);
  } catch (error) {
    res.status(500).json({ message: "Error updating element" });
  }
};

// Delete an element
exports.deleteElement = async (req, res) => {
  try {
    const deletedElement = await Element.findByIdAndDelete(req.params.id);
    if (!deletedElement) return res.status(404).json({ message: "Element not found" });

    res.status(200).json({ message: "Element deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting element" });
  }
};
