import express from 'express';

import {authMiddleware ,roleMiddleware }from '../middlewares/authMiddleware.js'

import { database } from '../middlewares/databaseMiddleware.js';
import { login } from '../controllers/userController.js';



const router = express.Router();

// Public route for login
router.post('/login', login);

// router.get('/getdata',getuserController)

router.post('/create',(req,res)=>{res.send(" i am don don is rate ")})

// Apply authMiddleware to all protected routes
router.use(authMiddleware);

// Protected routes with role-based access
router.get('/admin', roleMiddleware('superadmin'), (req, res) => {
  res.send('Welcome Admin');
});

router.get('/subadmin', roleMiddleware('subadmin'), (req, res) => {
  res.send('Welcome Subadmin');
});

router.get('/client', roleMiddleware('clientadmin'), (req, res) => {
  res.send('Welcome Client');
});

export default router;
