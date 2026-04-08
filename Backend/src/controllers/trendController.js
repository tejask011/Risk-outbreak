const Case = require("../models/Case");

const getTrend = async (req, res) => {
  try {
    const { city, disease } = req.query;

    // ===== FILTER (case-insensitive) =====
    let query = {};

    if (city) {
      query.city = { $regex: city, $options: "i" };
    }

    if (disease) {
      query.disease = { $regex: disease, $options: "i" };
    }

    const cases = await Case.find(query);

    // ===== NO DATA =====
    if (cases.length === 0) {
      return res.json({
        message: "No data found",
        data: null,
      });
    }

    // ===== BASIC STATS =====
    const last7 = cases.slice(-7);

    const avgLast7Days =
      last7.reduce((sum, c) => sum + c.cases, 0) / last7.length;

    const todayCases = cases[cases.length - 1].cases;

    const prevAvg =
      cases.slice(0, -1).reduce((sum, c) => sum + c.cases, 0) /
      (cases.length - 1 || 1);

    const growthRate = ((todayCases - prevAvg) / prevAvg) * 100;

    let trend = "STABLE";
    if (growthRate > 10) trend = "INCREASING";
    else if (growthRate < -10) trend = "DECREASING";

    // ===== MULTI-DISEASE ANALYSIS 🔥 =====
    const diseaseMap = {};

    cases.forEach((c) => {
      const key = c.disease.toLowerCase().trim(); // normalize

      if (!diseaseMap[key]) diseaseMap[key] = [];
      diseaseMap[key].push(c.cases);
    });

    let diseaseStats = [];

    for (let d in diseaseMap) {
      const arr = diseaseMap[d];

      if (arr.length < 2) continue;

      const last = arr[arr.length - 1];

      const prevAvg =
        arr.slice(0, -1).reduce((a, b) => a + b, 0) /
        (arr.length - 1);

      const growth = ((last - prevAvg) / prevAvg) * 100;

      diseaseStats.push({
        name: d,
        growth,
      });
    }

    // ===== DEBUG =====
    console.log("DISEASE STATS:", diseaseStats);

    // ===== SORT =====
    diseaseStats.sort((a, b) => b.growth - a.growth);

    // ===== RESPONSE =====
    res.json({
      message: "Trend calculated",
      data: {
        avgLast7Days,
        todayCases,
        growthRate,
        trend,
        diseases: diseaseStats, // 🔥 IMPORTANT
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getTrend };