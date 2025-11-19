require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { holdings, positions } = require("./data");

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(bodyParser.json());

/** 👉 APIs used by React */
app.get("/allHoldings", async (req, res) => {
  try {
    const result = await HoldingsModel.find({});
    res.json(result);
  } catch (err) {
    console.error("Error in /allHoldings:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const result = await PositionsModel.find({});
    res.json(result);
  } catch (err) {
    console.error("Error in /allPositions:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });
    await newOrder.save();
    res.send("Order saved!");
  } catch (err) {
    console.error("Error in /newOrder:", err);
    res.status(500).send("Error saving order");
  }
});

/** 👉 Connect DB, auto-seed once, then start server */
mongoose
  .connect(MONGO_URL)
  .then(async () => {
    console.log("DB connected");

    // AUTO-SEED HOLDINGS
    const holdingsCount = await HoldingsModel.estimatedDocumentCount();
    console.log("Current holdings count:", holdingsCount);
    if (holdingsCount === 0) {
      await HoldingsModel.insertMany(holdings);
      console.log("Holdings auto-seeded:", holdings.length);
    } else {
      console.log("Holdings already exist, not seeding.");
    }

    // AUTO-SEED POSITIONS
    const positionsCount = await PositionsModel.estimatedDocumentCount();
    console.log("Current positions count:", positionsCount);
    if (positionsCount === 0) {
      await PositionsModel.insertMany(positions);
      console.log("Positions auto-seeded:", positions.length);
    } else {
      console.log("Positions already exist, not seeding.");
    }

    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("Mongo Error:", err));
