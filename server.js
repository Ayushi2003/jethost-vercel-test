const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const publicDir = path.join(__dirname, 'public');
const indexFile = path.join(publicDir, 'index.html');

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Static frontend
app.use(express.static(publicDir, {
  index: false,
  extensions: ['html']
}));

// API routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend is running!',
    node: process.version,
    env: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
  });
});

app.post('/api/echo', (req, res) => {
  res.json({
    received: req.body,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/env', (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV || '(not set)',
    PORT: process.env.PORT || '(not set)',
    APP_NAME: process.env.APP_NAME || '(not set)',
  });
});

app.use('/api', (req, res) => {
  res.status(404).json({
    error: 'API route not found',
    path: req.originalUrl
  });
});

// Frontend fallback
app.get('*', (req, res) => {
  res.sendFile(indexFile);
});

/* app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
  console.log(`Node.js: ${process.version}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); */

// Export the app for Vercel Serverless
module.exports = app;

// Keep the listen block for local testing
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, HOST, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
  });
}