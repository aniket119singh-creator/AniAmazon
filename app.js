// Import Express
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Port
const port = process.env.PORT || 3000;

// ✅ Correct ENV variable (Render se aayega)
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// ==============================
// ✅ Webhook Verification (GET)
// ==============================
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('--- Webhook Verification Request ---');
  console.log('Mode:', mode);
  console.log('Token Received:', token);
  console.log('Expected Token:', VERIFY_TOKEN);

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ WEBHOOK VERIFIED SUCCESSFULLY');
    return res.status(200).send(challenge);
  } else {
    console.log('❌ VERIFICATION FAILED');
    return res.sendStatus(403);
  }
});

// ==============================
// ✅ Webhook Receive Messages (POST)
// ==============================
app.post('/webhook', (req, res) => {
  console.log('📩 Incoming Webhook Message:');
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

// ==============================
// ✅ Test Route
// ==============================
app.get('/', (req, res) => {
  res.send('🚀 Server is running successfully');
});

// ==============================
// ✅ Start Server (ONLY ONCE)
// ==============================
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
