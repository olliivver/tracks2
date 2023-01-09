const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

const {
  createCrossing,
  getCrossing,
  deleteCrossing,
  updateCrossingPolice,
  updateCrossingOpen,
  updateCrossingClosed,
  updateCrossingPoliceGone,
  getSingleCrossing,
  pushPoliceReport,
  policeReportTimes,
} = require("./handlers");

app.use(express.json())
app.use(helmet())
app.use(morgan('tiny'))
app.use(express.static("../build"))


app.get("/", (req, res) => {
  res.status(200).json({status: 200, message: "Penis World!"});
});

app.get("/get-crossing", getCrossing)
app.get("/get-police-reports", policeReportTimes);
app.get("/get-single-crossing/:_id", getSingleCrossing);
app.post("/make-crossing", createCrossing)
app.post("/police-ts", pushPoliceReport)
app.patch("/report-police", updateCrossingPolice);
app.patch("/report-police-gone", updateCrossingPoliceGone);
app.patch("/report-open", updateCrossingOpen);
app.patch("/report-closed", updateCrossingClosed);
app.delete("/delete-crossing/:id", deleteCrossing)


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
