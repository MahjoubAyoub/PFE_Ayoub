const Collaboration = require("../models/modelsCollaboration");

exports.getCollaborators = async (req, res) => {
  try {
    const { projectId } = req.params;
    const collaborators = await Collaboration.find({ design: projectId })
      .populate('user', 'name email');
    res.status(200).json(collaborators);
  } catch (error) {
    console.error('Error fetching collaborators:', error);
    res.status(500).json({ message: "Error fetching collaborators" });
  }
};

exports.addCollaborator = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId, role } = req.body;

    if (!["editor", "viewer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be 'editor' or 'viewer'." });
    }

    const newCollaboration = new Collaboration({
      design: projectId,
      user: userId,
      role
    });
    
    await newCollaboration.save();
    const populated = await newCollaboration.populate('user', 'name email');
    res.status(201).json(populated);
  } catch (error) {
    console.error('Error adding collaborator:', error);
    res.status(500).json({ message: "Error adding collaborator" });
  }
};

exports.removeCollaborator = async (req, res) => {
  try {
    const { projectId, userId } = req.params;
    
    const result = await Collaboration.findOneAndDelete({
      design: projectId,
      user: userId
    });

    if (!result) {
      return res.status(404).json({ message: "Collaboration not found" });
    }

    res.status(200).json({ message: "Collaborator removed successfully" });
  } catch (error) {
    console.error('Error removing collaborator:', error);
    res.status(500).json({ message: "Error removing collaborator" });
  }
};

exports.updateCollaboratorRole = async (req, res) => {
  try {
    const { projectId, userId } = req.params;
    const { role } = req.body;

    if (!["editor", "viewer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be 'editor' or 'viewer'." });
    }

    const collaboration = await Collaboration.findOneAndUpdate(
      { design: projectId, user: userId },
      { role },
      { new: true }
    ).populate('user', 'name email');

    if (!collaboration) {
      return res.status(404).json({ message: "Collaboration not found" });
    }

    res.status(200).json(collaboration);
  } catch (error) {
    console.error('Error updating collaborator role:', error);
    res.status(500).json({ message: "Error updating collaborator role" });
  }
};
