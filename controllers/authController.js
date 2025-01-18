import { SECRET_KEY } from '../middlewares/authMiddleware.js';

import jwt from 'jsonwebtoken'

// Hardcoded user for demonstration purposes
const users = [
    { username: "admin", password: "password123", role: "admin" },
    { username: "user", password: "password123", role: "user" }
];

 export const login = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const { username, password } = JSON.parse(body);
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Login successful", token }));
        } else {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid credentials" }));
        }
    });
};

