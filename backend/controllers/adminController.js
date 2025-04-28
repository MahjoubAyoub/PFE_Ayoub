const User = require('../models/User');
const Design = require('../models/modelsDesign');
const Template = require('../models/modelsTemplate');

// User Management
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { name, email, role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Template Management
exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ message: 'Error fetching templates' });
  }
};

exports.createTemplate = async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({ message: 'Error creating template' });
  }
};

exports.updateTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.templateId,
      req.body,
      { new: true }
    );
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json(template);
  } catch (error) {
    console.error('Error updating template:', error);
    res.status(500).json({ message: 'Error updating template' });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.templateId);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({ message: 'Error deleting template' });
  }
};

// Statistics
exports.getStatistics = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const designCount = await Design.countDocuments();
    const templateCount = await Template.countDocuments();

    res.status(200).json({
      users: userCount,
      designs: designCount,
      templates: templateCount
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
};

exports.getUserStatistics = async (req, res) => {
  try {
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    
    const usersByMonth = await User.aggregate([
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({ usersByRole, usersByMonth });
  } catch (error) {
    console.error('Error fetching user statistics:', error);
    res.status(500).json({ message: 'Error fetching user statistics' });
  }
};

exports.getDesignStatistics = async (req, res) => {
  try {
    const designsByMonth = await Design.aggregate([
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({ designsByMonth });
  } catch (error) {
    console.error('Error fetching design statistics:', error);
    res.status(500).json({ message: 'Error fetching design statistics' });
  }
};

exports.getTemplateStatistics = async (req, res) => {
  try {
    const templatesByCategory = await Template.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.status(200).json({ templatesByCategory });
  } catch (error) {
    console.error('Error fetching template statistics:', error);
    res.status(500).json({ message: 'Error fetching template statistics' });
  }
};

// Media Management
exports.getAllMedia = async (req, res) => {
  try {
    // This would need to be implemented based on your media storage solution
    res.status(200).json([]);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ message: 'Error fetching media' });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    // This would need to be implemented based on your media storage solution
    res.status(200).json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Error deleting media:', error);
    res.status(500).json({ message: 'Error deleting media' });
  }
};

exports.cleanupUnusedMedia = async (req, res) => {
  try {
    // This would need to be implemented based on your media storage solution
    res.status(200).json({ message: 'Media cleanup completed' });
  } catch (error) {
    console.error('Error cleaning up media:', error);
    res.status(500).json({ message: 'Error cleaning up media' });
  }
};