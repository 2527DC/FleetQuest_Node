import express from 'express';


const router =express.Router()
router.get('/checkmessage', (req, res) => {
  res.send(`I am don don is rate, Hostname: ${req.hostname}`);
});
export default router;
