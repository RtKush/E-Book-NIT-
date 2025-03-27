
// Import models
const users = require('../models/users');

// Login handler
const login = (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  // Find user
  const user = users.find(user => user.email === email);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  
  // In a real app, we would generate a JWT token here
  const token = 'demo-token-' + Date.now();
  
  // Don't send password back to client
  const { password: _, ...userWithoutPassword } = user;
  
  res.json({
    message: 'Login successful',
    user: userWithoutPassword,
    token
  });
};

// Register handler
const register = (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }
  
  // Check if user already exists
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }
  
  // Create new user (in a real app, this would save to a database)
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password, // In a real app, this would be hashed
    role: 'user'
  };
  
  users.push(newUser);
  
  // Don't send password back to client
  const { password: _, ...userWithoutPassword } = newUser;
  
  res.status(201).json({
    message: 'User registered successfully',
    user: userWithoutPassword
  });
};

// Logout handler
const logout = (req, res) => {
  // In a real app with JWT, there's no server-side logout
  // The client would just remove the token
  res.json({ message: 'Logout successful' });
};

// Get user profile
const getUser = (req, res) => {
  // User is already added to req by the auth middleware
  const userId = req.user.id;
  
  // Find user
  const user = users.find(user => user.id === userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Don't send password back to client
  const { password, ...userWithoutPassword } = user;
  
  res.json({ user: userWithoutPassword });
};

module.exports = {
  login,
  register,
  logout,
  getUser
};
