const express = require('express');
// json database
const nedb = require('nedb');

const app = express();

// Create a database instance and load the data file
const db = new nedb({ filename: 'data.json', autoload: true });
// create collection for payload
db.insert({ payload: [] });






// Use body-parser to parse incoming JSON payloads
app.use(express.json());

// Define a route to handle incoming GitHub webhook events
app.post('/webhook', (req, res) => {
  const payload = req.body;
  // Save the payload to NeDB
  // add to payload array
  db.update({}, { $push: { payload: payload } }, {}, (err, numReplaced) => {
    if (err) {
      console.error(err);
    }
    console.log(`Added payload to database: ${payload}`);
  });

  // You can add your custom logic here to process the GitHub webhook payload
  console.log('Received GitHub webhook event:', payload);


  // Respond with a 200 OK to acknowledge receipt of the payload
  res.status(200).send('Webhook received');
});
app.get('/webhook', (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      console.error(err);
    }
    res.json(docs);
  });
}
);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

