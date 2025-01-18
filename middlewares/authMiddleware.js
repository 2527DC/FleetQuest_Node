import jwt from 'jsonwebtoken';
 export const SECRET_KEY = "mysecretkey"; // Use a secure key in production.

 export const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Token missing" }));
        return;
    }

    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
        if (err) {
            res.writeHead(403, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Invalid token" }));
            return;
        }
        req.user = user;
        next(); // Proceed to the next middleware or controller
    });
};

 export const authorizeRole = (roles) => (req, res, next) => {
    if (roles.includes(req.user.role)) {
        next();
    } else {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Access denied" }));
    }
};

