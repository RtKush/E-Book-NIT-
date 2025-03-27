
// Mock users database
// In a real application, this would be a database connection

const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password', // In a real app, this would be hashed
    role: 'user'
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    id: '3',
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password123',
    role: 'admin'
  }
];

module.exports = users;
