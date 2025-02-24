import express from 'express';
import { addTenant, getTenantUsers } from '../controllers/adminController.js';
// import { createTenant } from '../controllers/adminController.js';


const router =express.Router()
router.get('/checkmessage', (req, res) => {
  res.send(`I am don don is rate, Hostname: ${req.hostname}`);
});

// router.post('/addDriver', addDriver);

// router.post('/addTenant',createTenant)

router.post('/addTenant',addTenant)
// Route to get users for a specific tenant
router.get("/tenant/:tenantName/users", getTenantUsers);

export default router;
