const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const jettonAddress = "EQCr0lE1bRZJw53LHdwP0W_i-XDJOVpeRF9YFVPfJpCtLSPo";

app.get("/ton-transactions", async (req, res) => {
  try {
    const url = `https://tonapi.io/v2/jettons/${jettonAddress}/transfers?limit=50`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Failed to fetch TON transactions", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

app.listen(PORT, () => {
  console.log(`TON proxy running on port ${PORT}`);
});
