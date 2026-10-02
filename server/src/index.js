const express = require('express');
const cors = require('cors');
require('dotenv').config();

require('./db/init');
const generateRouter = require('./routes/generate');
const executeRouter = require('./routes/execute');
const authRouter = require('./routes/auth');
const reportsRouter = require('./routes/reports');
const { verifyToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://api-test-generator-topaz.vercel.app',
  'http://localhost:5173',
  process.env.CLIENT_URL
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (curl, mobile apps, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Handle preflight for all routes before any middleware that might reject early
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

// Required for Google OAuth popup to communicate back to the parent window
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRouter);
app.use('/api/generate', verifyToken, generateRouter);
app.use('/api/execute', verifyToken, executeRouter);
app.use('/api/reports', verifyToken, reportsRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));