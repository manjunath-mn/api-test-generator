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

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRouter);
app.use('/api/generate', verifyToken, generateRouter);
app.use('/api/execute', verifyToken, executeRouter);
app.use('/api/reports', verifyToken, reportsRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));