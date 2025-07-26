const express = require('express');
const path    = require('path');
const app     = express();
const port    = 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Optional sanity‑check route:
app.get('/ping', (_req, res) => res.send('pong'));

// Addition endpoint
app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send('Invalid numbers');
  }
  res.send(`Sum is: ${num1 + num2}`);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
