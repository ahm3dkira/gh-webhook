const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// Use body-parser to parse incoming JSON payloads
app.use(express.json());

// Define a route to handle incoming GitHub webhook events
app.post('/webhook', (req, res) => {
  const payload = req.body;

  // You can add your custom logic here to process the GitHub webhook payload
  console.log('Received GitHub webhook event:', payload);

  // Respond with a 200 OK to acknowledge receipt of the payload
  res.status(200).send('Webhook received');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

