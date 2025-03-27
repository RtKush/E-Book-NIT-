
// Import models
const books = require('../models/books');

// Get all books
const getAllBooks = (req, res) => {
  res.json({ books });
};

// Get book by ID
const getBookById = (req, res) => {
  const { id } = req.params;
  
  const book = books.find(book => book.id === id);
  
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  res.json({ book });
};

// Create a new book (admin only)
const createBook = (req, res) => {
  const { title, author, price, coverImage, description, isbn, publisher, publicationDate, pages, category, stock } = req.body;
  
  if (!title || !author || !price) {
    return res.status(400).json({ message: 'Title, author and price are required' });
  }
  
  const newBook = {
    id: (books.length + 1).toString(),
    title,
    author,
    price,
    coverImage,
    description,
    isbn,
    publisher,
    publicationDate,
    pages,
    category,
    stock
  };
  
  books.push(newBook);
  
  res.status(201).json({
    message: 'Book created successfully',
    book: newBook
  });
};

// Update a book (admin only)
const updateBook = (req, res) => {
  const { id } = req.params;
  
  const bookIndex = books.findIndex(book => book.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  // Update book
  books[bookIndex] = {
    ...books[bookIndex],
    ...req.body
  };
  
  res.json({
    message: 'Book updated successfully',
    book: books[bookIndex]
  });
};

// Delete a book (admin only)
const deleteBook = (req, res) => {
  const { id } = req.params;
  
  const bookIndex = books.findIndex(book => book.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  // Remove book
  const deletedBook = books.splice(bookIndex, 1)[0];
  
  res.json({
    message: 'Book deleted successfully',
    book: deletedBook
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
