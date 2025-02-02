import express from 'express';
import router from './src/routes/admin.js';
import dotenv from 'dotenv';
 import cors from 'cors'
dotenv.config(); // Ensure environment variables are loaded
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data (if needed)
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // If using cookies or authentication headers
}));
// Use your routes
app.use('/api', router);


const port = 3000;
const hostname = 'localhost';
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
// import fs from 'fs';
// import express from 'express';
// const app = express();
// app.use(express.json());

// // Helper function to modify /etc/hosts
// const addToHostsFile = (subdomain) => {
//   const hostsFilePath = '/etc/hosts';
//   const newEntry = `127.0.0.1\t${subdomain}\n`;

//   // Read the /etc/hosts file
//   fs.readFile(hostsFilePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading hosts file:', err);
//       return;
//     }

//     // Check if the entry already exists
//     if (data.includes(subdomain)) {
//       console.log(`${subdomain} already exists in hosts file.`);
//       return;
//     }

//     // Append the new entry
//     const updatedData = data + newEntry;
//     fs.writeFile(hostsFilePath, updatedData, 'utf8', (err) => {
//       if (err) {
//         console.error('Error writing to hosts file:', err);
//         return;
//       }
//       console.log(`Successfully added ${subdomain} to hosts file.`);
//     });
//   });
// };

// // API endpoint to create subdomain
// app.post('/create-subdomain', (req, res) => {
//   const { subdomain } = req.body;

//   if (!subdomain) {
//     return res.status(400).send('Subdomain is required');
//   }

//   // Add subdomain to /etc/hosts
//   addToHostsFile(subdomain);

//   // Optionally, you can restart any necessary services or server to reflect changes

//   res.send(`Subdomain ${subdomain} added to /etc/hosts`);
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
