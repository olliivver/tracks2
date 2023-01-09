const { v4: uuidv4 } = require("uuid");

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { query } = require("express");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createCrossing = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("tracks");
  const result = req.body;
  // adds an order ID to the final order
  const finalResult = await db.collection("crossings").insertOne({
    _id: uuidv4(),
    result,
  });
  finalResult
    ? res.status(200).json({
        status: 200,
        data: finalResult,
        message: "crossing created",
      })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const getCrossing = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("tracks");
  const finalResult = await db.collection("crossings").find().toArray();
  finalResult
    ? res.status(200).json({
        status: 200,
        data: finalResult,
        message: "crossings",
      })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const getSingleCrossing = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("tracks");
  const _id = req.body._id;

  const finalResult = await db.collection("crossings").findOne(_id);

  finalResult
    ? res.status(200).json({
        status: 200,
        data: finalResult,
        message: "crossing",
      })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const deleteCrossing = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("tracks");
  const _id = req.params.id;

  const result = await db.collection("crossings").deleteOne({ _id: _id });
  result.deletedCount > 0
    ? res
        .status(200)
        .json({ status: 200, data: result, message: "crossing deleted" })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const updateCrossingPolice = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("tracks");
  const _id = req.body._id;
  //const oldCrossing = await db.collection("crossings").findOne(_id);
  console.log(_id);
  try {
    const query = {
      _id: _id,
    };
    const reportPolice = { $set: { "result.police": true } };

    const policeReport = await db
      .collection("crossings")
      .updateOne(query, reportPolice);

    console.log(policeReport);
    return res.status(200).json({ status: 200, data: "Police Reported" });
  } catch (err) {
    return res.status(400).json({ status: 400, error: err.message });
  } finally {
    client.close();
  }
};

const updateCrossingPoliceGone = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("tracks");
  const _id = req.body._id;
  console.log(_id);
  try {
    const query = {
      _id: _id,
    };
    const reportPolice = { $set: { "result.police": false } };

    const policeReport = await db
      .collection("crossings")
      .updateOne(query, reportPolice);

    return res.status(200).json({ status: 200, data: "Police Reported" });
  } catch (err) {
    return res.status(400).json({ status: 400, error: err.message });
  } finally {
    client.close();
  }
};

const updateCrossingOpen = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("tracks");
  const _id = req.body._id;
  try {
    const query = {
      _id: _id,
    };
    const markOpen = { $set: { "result.open": true } };

    const markOpenUpdate = await db
      .collection("crossings")
      .updateOne(query, markOpen);

    return res.status(200).json({ status: 200, data: "Crossing Marked Open" });
  } catch (err) {
    return res.status(400).json({ status: 400, error: err.message });
  } finally {
    client.close();
  }
};

const updateCrossingClosed = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("tracks");
  const _id = req.body._id;
  try {
    const query = {
      _id: _id,
    };
    const markClosed = { $set: { "result.open": false } };

    const markClosedUpdate = await db
      .collection("crossings")
      .updateOne(query, markClosed);

    return res
      .status(200)
      .json({ status: 200, data: "Crossing Marked Closed" });
  } catch (err) {
    return res.status(400).json({ status: 400, error: err.message });
  } finally {
    client.close();
  }
};

const pushPoliceReport = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("tracks");
  const id = req.body.id;

  const crossing = await db.collection("crossings").findOne({ _id: id });
  console.log(crossing);
  const crossingName = crossing.result.name;
  console.log(crossing);

  const finalResult = await db.collection("reports").insertOne({
    crossingName,
  });

  finalResult
    ? res.status(200).json({
        status: 200,
        data: finalResult,
        message: "hello",
      })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};

const policeReportTimes = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("tracks");
  const id = req.body.id;

  const reports = await db.collection("reports").find().toArray();

  let newArr = reports.map((report) => {
    return {
      crossingName: report.crossingName,
      timeStamp: ObjectId(report._id).getTimestamp(),
    };
  });

  newArr
    ? res.status(200).json({
        status: 200,
        data: newArr,
        message: "hello",
      })
    : res.status(404).json({ status: 404, message: "Not Found" });
  client.close();
};


module.exports = {
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
};
