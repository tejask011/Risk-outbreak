const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");

const {
  addManualData,
  uploadCSV,
} = require("../controllers/dataController");

router.post("/manual", addManualData);
router.post("/upload", upload.single("file"), uploadCSV);

module.exports = router;
