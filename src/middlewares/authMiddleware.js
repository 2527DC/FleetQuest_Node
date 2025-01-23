import jwt from 'jsonwebtoken';

const roleSecrets = {
  superadmin: 'superAdminSecretKey123',
  subadmin: 'subAdminSecretKey456',
  clientadmin: 'clientAdminSecretKey789',
};

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Decode the token without verifying it to get the role
    const decoded = jwt.decode(token);
    const { role } = decoded;

    if (!role || !roleSecrets[role]) {
      return res.status(403).json({ message: 'Invalid role in token.' });
    }

    // Verify the token with the role-specific secret key
    const verified = jwt.verify(token, roleSecrets[role]);
    req.user = verified; // Attach user info to request object
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};
