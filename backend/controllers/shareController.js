const socialMediaService = require("../services/socialMediaService");
const Share = require("../models/share");
const Design = require("../models/modelsDesign");

exports.shareDesign = async (req, res) => {
  try {
    const { designId, platform } = req.body;
    const result = await socialMediaService.shareDesign(designId, platform);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Sharing failed" });
  }
};

exports.getSharedDesigns = async (req, res) => {
  try {
    const shares = await Share.find({ sharedWith: req.user.id })
      .populate('designId');
    res.status(200).json(shares);
  } catch (error) {
    console.error("Failed to get shared designs:", error);
    res.status(500).json({ message: "Failed to get shared designs" });
  }
};

exports.updateSharePermissions = async (req, res) => {
  try {
    const { designId } = req.params;
    const { permissions, userId } = req.body;
    
    const share = await Share.findOneAndUpdate(
      { designId, sharedWith: userId },
      { permissions },
      { new: true }
    );

    if (!share) {
      return res.status(404).json({ message: "Share not found" });
    }

    res.status(200).json(share);
  } catch (error) {
    console.error("Failed to update permissions:", error);
    res.status(500).json({ message: "Failed to update permissions" });
  }
};

exports.revokeAccess = async (req, res) => {
  try {
    const { designId } = req.params;
    const { userId } = req.body;

    const result = await Share.findOneAndDelete({ 
      designId, 
      sharedWith: userId 
    });

    if (!result) {
      return res.status(404).json({ message: "Share not found" });
    }

    res.status(200).json({ message: "Access revoked successfully" });
  } catch (error) {
    console.error("Failed to revoke access:", error);
    res.status(500).json({ message: "Failed to revoke access" });
  }
};
