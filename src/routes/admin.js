import express from 'express';

router.get('/checkmessage', (req, res) => {
  res.send(`I am don don is rate, Hostname: ${req.hostname}`);
});
export default router;
