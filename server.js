const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/ton-transactions', async (req, res) => {
  const wallet = 'UQDJ4MYVly1mUpCTfk1jlsUWP7SJeoCc4IRc7I7faCfhj6A2'; // Change to your wallet
  const url = `https://tonapi.io/v2/accounts/${wallet}/jettons/history?limit=10`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer AF42MGOF3CLLEAQAAAANAGJ6BBFYBFFCSH7JSS6UDPTGRSA45PIMWJJ5OKATLUZO73AL5CI'
      }
    });
    const json = await response.json();
    res.json(json.events || []); // Just send events array to frontend
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: 'Failed to load transactions' });
  }
});

app.listen(PORT, () => {
  console.log(`TON proxy running on port ${PORT}`);
});
