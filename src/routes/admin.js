import express from 'express';
import { addDriver } from '../controllers/adminController.js';


const router =express.Router()
router.get('/checkmessage', (req, res) => {
  res.send(`I am don don is rate, Hostname: ${req.hostname}`);
});

router.post('/addDriver', addDriver);


export default router;
