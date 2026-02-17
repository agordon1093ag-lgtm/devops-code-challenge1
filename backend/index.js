const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Main endpoint that returns an ID (root)
app.get('/', (req, res) => {
  const id = Math.random().toString(36).substring(2, 15);
  res.json({ id });
});

// API endpoint that returns an ID (for frontend)
app.get('/api', (req, res) => {
  const id = Math.random().toString(36).substring(2, 15);
  res.json({ id });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
