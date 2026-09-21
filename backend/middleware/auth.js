const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'No token provided' });
  try {
    req.auth = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch (err) { return res.status(401).json({ message: 'Invalid or expired token' }); }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.auth || req.auth.role !== role) return res.status(403).json({ message: `Access denied. ${role} role required.` });
    next();
  };
}

module.exports = { verifyToken, requireRole };
