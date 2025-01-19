import express from 'express';
import router from './src/routes/admin.js';
 // Adjust the path as necessary

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json()); 

// Middleware to parse URL-encoded data (if needed)
app.use(express.urlencoded({ extended: true }));

// Use your routes
app.use('/api', router);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
