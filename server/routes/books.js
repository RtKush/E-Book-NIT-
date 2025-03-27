
const express = require('express');
const router = express.Router();

// Import controllers
const booksController = require('../controllers/booksController');

// Import middlewares
const { authenticate } = require('../middlewares/auth');

// Books routes
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.post('/', authenticate, booksController.createBook); // Admin only
router.put('/:id', authenticate, booksController.updateBook); // Admin only
router.delete('/:id', authenticate, booksController.deleteBook); // Admin only

module.exports = router;
