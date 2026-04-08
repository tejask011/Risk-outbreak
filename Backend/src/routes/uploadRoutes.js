const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const Case = require("../models/Case");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      results.push({
        city: data.city,
        disease: data.disease,
        date: new Date(data.date),
        cases: Number(data.cases),
      });
    })
    .on("end", async () => {
      try {
        await Case.insertMany(results);

        console.log("CSV DATA INSERTED:", results.length);

        res.json({
          message: "CSV uploaded & data saved ✅",
          count: results.length,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "DB insert failed" });
      }
    });
});

module.exports = router;