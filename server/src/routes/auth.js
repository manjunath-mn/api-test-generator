const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');
const { OAuth2Client } = require('google-auth-library');
const { getDb } = require('../db/init');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();
const db = getDb();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '24h',
  });
};

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, hashedPassword);

    const token = generateToken(result.lastInsertRowid);
    res.json({ token, email });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = db.prepare('SELECT id, password FROM users WHERE email = ?').get(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user.id);
    res.json({ token, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/google', async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ error: 'Google credential is required' });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user = db.prepare('SELECT id, email FROM users WHERE google_id = ? OR email = ?').get(googleId, email);

    if (!user) {
      // Random, never-usable password hash so this account can't be logged into via the password form
      const randomPassword = bcrypt.hashSync(crypto.randomBytes(32).toString('hex'), 10);
      const result = db.prepare(
        'INSERT INTO users (email, password, full_name, avatar, google_id) VALUES (?, ?, ?, ?, ?)'
      ).run(email, randomPassword, name || null, picture || null, googleId);
      user = { id: result.lastInsertRowid, email };
    } else {
      db.prepare('UPDATE users SET google_id = ?, full_name = COALESCE(full_name, ?), avatar = COALESCE(avatar, ?) WHERE id = ?')
        .run(googleId, name || null, picture || null, user.id);
    }

    const token = generateToken(user.id);
    res.json({ token, email: user.email });
  } catch (err) {
    res.status(401).json({ error: 'Invalid Google credential' });
  }
});

router.get('/profile', verifyToken, (req, res) => {
  try {
    const user = db.prepare('SELECT id, email, full_name, avatar FROM users WHERE id = ?').get(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/profile', verifyToken, (req, res) => {
  const { full_name, avatar } = req.body;

  try {
    db.prepare('UPDATE users SET full_name = ?, avatar = ? WHERE id = ?').run(full_name || null, avatar || null, req.user.id);

    const user = db.prepare('SELECT id, email, full_name, avatar FROM users WHERE id = ?').get(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
