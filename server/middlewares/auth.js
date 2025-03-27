
// Simple JWT authentication middleware

const authenticate = (req, res, next) => {
  // Get the token from the header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    // In a real app, you would verify the JWT token here
    // For this demo, we'll just check for a token presence
    
    // Add user info to request
    req.user = { id: '1', email: 'user@example.com' };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin authorization middleware (for protected routes)
const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin permission required' });
  }
  
  next();
};

module.exports = {
  authenticate,
  authorizeAdmin
};
