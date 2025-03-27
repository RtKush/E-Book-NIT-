
# Bookopia Backend Server

This is the Express.js backend server for the Bookopia bookstore application.

## Setup and Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
   
   For development with auto-reload:
   ```
   npm run dev
   ```

## Server Structure

- `server.js` - Main entry point for the Express application
- `server/controllers/` - Controllers for handling route logic
- `server/routes/` - API route definitions
- `server/models/` - Data models
- `server/middlewares/` - Custom middleware functions

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/user` - Get authenticated user information

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book by ID
- `POST /api/books` - Create a new book (admin only)
- `PUT /api/books/:id` - Update a book (admin only)
- `DELETE /api/books/:id` - Delete a book (admin only)

## Note for Production

In a production environment, you would need to:
1. Use environment variables for sensitive information
2. Implement proper JWT authentication
3. Connect to a real database instead of using mock data
4. Add more robust error handling and logging
5. Consider implementing rate limiting and other security features
