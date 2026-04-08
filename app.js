const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.hello;

// Webhook verification route
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('GET /webhook called');
  console.log('Mode:', mode);
  console.log('Token received:', token);
  console.log('Expected token:', VERIFY_TOKEN);

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK VERIFIED');
    return res.status(200).send(challenge);
  } else {
    console.log('VERIFICATION FAILED');
    return res.sendStatus(403);
  }
});

// Webhook receive messages
app.post('/webhook', (req, res) => {
  console.log('Webhook received:');
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Test route
app.get('/', (req, res) => {
  res.send('Server running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
