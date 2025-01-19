import express from 'express';
import jwt from 'jsonwebtoken';
import {authMiddleware ,roleMiddleware }from '../middlewares/authMiddleware.js'

const router = express.Router();

// Role-specific secret keys
const roleSecrets = {
  superAdmin: 'superAdminSecretKey123',
  subAdmin: 'subAdminSecretKey456',
  clientAdmin: 'clientAdminSecretKey789',
};

// Mock user data
const users = {
  user1: { username: 'user1', role: 'superAdmin' },
  user2: { username: 'user2', role: 'subAdmin' },
  user3: { username: 'user3', role: 'clientAdmin' },
};

// Login controller
const login = (req, res) => {
  const { username } = req.body;

  const user = users[username];
  if (!user) {
    return res.status(401).json({ message: 'Invalid username' });
  }

  const { role } = user;
  const secretKey = roleSecrets[role];

  if (!secretKey) {
    return res.status(403).json({ message: 'Invalid role' });
  }

  const token = jwt.sign({ username, role }, secretKey, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
};

// Public route for login
router.post('/login', login);

// Apply authMiddleware to all protected routes
router.use(authMiddleware);

// Protected routes with role-based access
router.get('/admin', roleMiddleware('superAdmin'), (req, res) => {
  res.send('Welcome Admin');
});

router.get('/subadmin', roleMiddleware('subAdmin'), (req, res) => {
  res.send('Welcome Subadmin');
});

router.get('/client', roleMiddleware('clientAdmin'), (req, res) => {
  res.send('Welcome Client');
});

export default router;
