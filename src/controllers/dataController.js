const Case = require("../models/Case");
const { parseCSV } = require("../services/csvService");
const fs = require("fs");

// CSV Upload
exports.uploadCSV = async (req, res) => {
  try {
    const filePath = req.file.path;

    const data = await parseCSV(filePath);

    // Save all rows
    const formatted = data.map((row) => ({
      city: row.city,
      disease: row.disease,
      cases: Number(row.cases),
    }));

    await Case.insertMany(formatted);

    // delete file after processing
    fs.unlinkSync(filePath);

    res.json({ message: "CSV uploaded successfully", count: formatted.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Manual Entry (already done)
exports.addManualData = async (req, res) => {
  try {
    const { city, disease, cases } = req.body;

    const newCase = new Case({ city, disease, cases });
    await newCase.save();

    res.json({ message: "Data added", data: newCase });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};