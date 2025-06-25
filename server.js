const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const jettonAddress = "EQCr0lE1bRZJw53LHdwP0W_i-XDJOVpeRF9YFVPfJpCtLSPo";
const tonApiKey = "AF42MGOF3CLLEAQAAAANAGJ6BBFYBFFCSH7JSS6UDPTGRSA45PIMWJJ5OKATLUZO73AL5CI";

app.get("/ton-transactions", async (req, res) => {
  try {
    const url = `https://tonapi.io/v2/jettons/${jettonAddress}/transfers?limit=50`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${tonApiKey}`,
        Accept: "application/json"
      }
    });

    const text = await response.text(); // First, get raw text
    console.log("RAW RESPONSE:", text); // Debug output

    const data = JSON.parse(text); // Now try parsing
    res.json(data);
  } catch (err) {
    console.error("Failed to fetch TON transactions", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

app.listen(PORT, () => {
  console.log(`TON proxy running on port ${PORT}`);
});
