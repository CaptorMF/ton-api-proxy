const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// CORS middleware so browser can call it
app.use(cors());

const API_KEY = 'AF42MGOF3CLLEAQAAAANAGJ6BBFYBFFCSH7JSS6UDPTGRSA45PIMWJJ5OKATLUZO73AL5CI';
const JETTON_ADDRESS = 'EQCr0lE1bRZJw53LHdwP0W_i-XDJOVpeRF9YFVPfJpCtLSPo';

app.get('/ton-transactions', async (req, res) => {
  const url = `https://tonapi.io/v2/jettons/${JETTON_ADDRESS}/transfers?limit=50`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: 'TON API error', message: text });
    }

    const data = await response.json();
    res.json(data.transfers || []);
  } catch (error) {
    console.error('TON fetch failed:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

app.listen(PORT, () => {
  console.log(`TON proxy running on port ${PORT}`);
});
