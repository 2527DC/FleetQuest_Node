import express from 'express';
import router from './src/routes/admin.js';

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data (if needed)
app.use(express.urlencoded({ extended: true }));

// Use your routes
app.use('/api', router);

// Start the server and specify the host and port
// const hostname = 'tenent1.fleetmanagement'; // You can also use '0.0.0.0' to listen on all interfaces
const port = 3000;
const hostname = 'tenent1.fleetmanagement';
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
