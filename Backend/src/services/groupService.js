

//Does the actual logic (groups data from DB)


const Case = require("../models/Case");

async function groupCases() {
const result = await Case.aggregate([
  {
    $group: {
      _id: {
        city: "$city",
        disease: "$disease",
      },
      totalCases: { $sum: "$cases" },
    },
  },
  {
    $project: {
      _id: 0,
      city: "$_id.city",
      disease: "$_id.disease",
      totalCases: 1,
    },
  },
]);

  return result;
}

module.exports = { groupCases };

