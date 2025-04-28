const puppeteer = require("puppeteer");
const PPTX = require("pptxgenjs");

async function exportToPDF(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();
  return pdfBuffer;
}

async function exportToPPTX(slidesData) {
  let pptx = new PPTX();
  slidesData.forEach((slide) => {
    let slideInstance = pptx.addSlide();
    slideInstance.addText(slide.text, { x: 1, y: 1, fontSize: 18 });
  });

  return pptx.write("base64"); // Return the PPTX file as a base64 string
}

module.exports = { exportToPDF, exportToPPTX };
