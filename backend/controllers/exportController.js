const puppeteer = require("puppeteer");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const Design = require("../models/modelsDesign");

// Export design as image
exports.exportAsImage = async (req, res) => {
  try {
    const { designId } = req.params;
    const { format = 'png' } = req.body;
    
    const design = await Design.findById(designId);
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(`<div>${design.shapes}</div>`);
    const filePath = `exported_design_${designId}.${format}`;

    await page.screenshot({ path: filePath, type: format });
    await browser.close();
    
    res.download(filePath, () => fs.unlinkSync(filePath));
  } catch (error) {
    console.error("Export as image failed:", error);
    res.status(500).json({ message: "Export as image failed" });
  }
};

// Export design as PDF
exports.exportAsPDF = async (req, res) => {
  try {
    const { designId } = req.params;
    
    const design = await Design.findById(designId);
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(`<div>${design.shapes}</div>`);
    const filePath = `exported_design_${designId}.pdf`;

    await page.pdf({ path: filePath });
    await browser.close();
    
    res.download(filePath, () => fs.unlinkSync(filePath));
  } catch (error) {
    console.error("Export as PDF failed:", error);
    res.status(500).json({ message: "Export as PDF failed" });
  }
};

// Get export history
exports.getExportHistory = async (req, res) => {
  try {
    // Since we're not storing export history yet, return empty array
    res.status(200).json([]);
  } catch (error) {
    console.error("Failed to get export history:", error);
    res.status(500).json({ message: "Failed to get export history" });
  }
};
