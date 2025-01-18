import http from 'http'
import { login } from './controllers/authController.js';
import { authenticateJWT, authorizeRole } from './middlewares/authMiddleware.js';

import {adminMessage} from './controllers/adminController.js'


const server = http.createServer((req, res) => {
    // Login Endpoint
    if (req.url === "/login" && req.method === "POST") {    

       
       
        return   login(req, res);

    }

    // Public Endpoint (No Token Required)
    if (req.url === "/public" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "This is a public endpoint accessible to everyone." }));
        return;
    }

    // Protected Admin Endpoint (Token + Admin Role Required)
    if (req.url === "/admin" && req.method === "GET") {
        authenticateJWT(req, res, () => {
            authorizeRole(["admin"])(req, res, () => {
                adminMessage(req, res);
            });
        });
        return;
    }

    // Not Found
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Endpoint not found" }));
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
