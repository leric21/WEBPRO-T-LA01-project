require("dotenv").config();
const express = require("express");
const cors = require("cors");

const Product = require("./models/Product");
const cartRoute = require("./routes/cart");
const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Hiba a termékek lekérdezése során" });
  }
});

app.use("/api/cart", cartRoute);
app.use("/api/auth", authRoute);

module.exports = app;