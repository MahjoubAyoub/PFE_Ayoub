// Get all templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = [
      // Social Media Templates
      { id: 1, name: "Instagram Post", category: "Social Media", dimensions: { width: 1080, height: 1080 } },
      { id: 2, name: "Instagram Story", category: "Social Media", dimensions: { width: 1080, height: 1920 } },
      { id: 3, name: "Facebook Post", category: "Social Media", dimensions: { width: 1200, height: 630 } },
      { id: 4, name: "Facebook Cover", category: "Social Media", dimensions: { width: 1640, height: 624 } },
      { id: 5, name: "Twitter Post", category: "Social Media", dimensions: { width: 1200, height: 675 } },
      { id: 6, name: "LinkedIn Post", category: "Social Media", dimensions: { width: 1200, height: 627 } },
      { id: 7, name: "Pinterest Pin", category: "Social Media", dimensions: { width: 1000, height: 1500 } },
      { id: 8, name: "YouTube Thumbnail", category: "Social Media", dimensions: { width: 1280, height: 720 } },

      // Print Templates
      { id: 9, name: "Business Card", category: "Print", dimensions: { width: 1050, height: 600 } },
      { id: 10, name: "Flyer A5", category: "Print", dimensions: { width: 1748, height: 2480 } },
      { id: 11, name: "Poster A4", category: "Print", dimensions: { width: 2480, height: 3508 } },
      { id: 12, name: "Brochure Tri-fold", category: "Print", dimensions: { width: 3508, height: 2480 } },
      { id: 13, name: "Letter Head", category: "Print", dimensions: { width: 2550, height: 3300 } },
      { id: 14, name: "Menu Design", category: "Print", dimensions: { width: 2550, height: 3300 } },
      { id: 15, name: "Business Invoice", category: "Print", dimensions: { width: 2480, height: 3508 } },
      { id: 16, name: "Gift Certificate", category: "Print", dimensions: { width: 2550, height: 1650 } },

      // Presentation Templates
      { id: 17, name: "Corporate Presentation", category: "Presentation", dimensions: { width: 1920, height: 1080 } },
      { id: 18, name: "Pitch Deck", category: "Presentation", dimensions: { width: 1920, height: 1080 } },
      { id: 19, name: "Educational Slides", category: "Presentation", dimensions: { width: 1920, height: 1080 } },
      { id: 20, name: "Sales Presentation", category: "Presentation", dimensions: { width: 1920, height: 1080 } },
      { id: 21, name: "Project Overview", category: "Presentation", dimensions: { width: 1920, height: 1080 } },
      { id: 22, name: "Marketing Plan", category: "Presentation", dimensions: { width: 1920, height: 1080 } },
      { id: 23, name: "Portfolio Showcase", category: "Presentation", dimensions: { width: 1920, height: 1080 } },
      { id: 24, name: "Annual Report", category: "Presentation", dimensions: { width: 1920, height: 1080 } },

      // Resume Templates
      { 
        id: 25, 
        name: "Professional Resume", 
        category: "Resume", 
        dimensions: { width: 2480, height: 3508 } // A4 size
      },
      { 
        id: 26, 
        name: "Creative Resume", 
        category: "Resume", 
        dimensions: { width: 2480, height: 3508 }
      },
      { 
        id: 27, 
        name: "Student Resume", 
        category: "Resume", 
        dimensions: { width: 2480, height: 3508 }
      },
      { 
        id: 28, 
        name: "Executive Resume", 
        category: "Resume", 
        dimensions: { width: 2480, height: 3508 }
      },
      { 
        id: 29, 
        name: "Modern Resume", 
        category: "Resume", 
        dimensions: { width: 2480, height: 3508 }
      },
      { 
        id: 30, 
        name: "Simple Resume", 
        category: "Resume", 
        dimensions: { width: 2480, height: 3508 }
      },
      { 
        id: 31, 
        name: "Technical Resume", 
        category: "Resume", 
        dimensions: { width: 2480, height: 3508 }
      },
      { 
        id: 32, 
        name: "Academic CV", 
        category: "Resume", 
        dimensions: { width: 2480, height: 3508 }
      }
    ];

    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch templates." });
  }
};

// Get a single template by ID
exports.getTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const templates = await exports.getTemplates(req, res);
    const template = templates.find(t => t.id === parseInt(id));
    
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch template." });
  }
};

// Create a new template
exports.createTemplate = async (req, res) => {
  try {
    // Since templates are predefined, we'll return a 405 Method Not Allowed
    res.status(405).json({ message: "Templates cannot be created - they are predefined." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

// Update a template
exports.updateTemplate = async (req, res) => {
  try {
    // Since templates are predefined, we'll return a 405 Method Not Allowed
    res.status(405).json({ message: "Templates cannot be updated - they are predefined." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

// Delete a template
exports.deleteTemplate = async (req, res) => {
  try {
    // Since templates are predefined, we'll return a 405 Method Not Allowed
    res.status(405).json({ message: "Templates cannot be deleted - they are predefined." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};
