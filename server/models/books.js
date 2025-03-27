
// Mock books database
// In a real application, this would be a database connection

const books = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 9.99,
    coverImage: 'https://source.unsplash.com/random/300x400?book',
    description: 'A novel about the American Dream and its corruption, set during the Roaring Twenties.',
    isbn: '9780743273565',
    publisher: 'Scribner',
    publicationDate: '1925-04-10',
    pages: 180,
    category: 'Classic Fiction',
    stock: 15
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 12.99,
    coverImage: 'https://source.unsplash.com/random/300x400?book,reading',
    description: 'A powerful story about racial injustice and moral growth in the American South during the 1930s.',
    isbn: '9780061120084',
    publisher: 'HarperCollins',
    publicationDate: '1960-07-11',
    pages: 281,
    category: 'Classic Fiction',
    stock: 10
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    price: 10.99,
    coverImage: 'https://source.unsplash.com/random/300x400?dystopia',
    description: 'A dystopian novel that portrays a totalitarian society and explores themes of surveillance and control.',
    isbn: '9780451524935',
    publisher: 'Signet Classic',
    publicationDate: '1949-06-08',
    pages: 328,
    category: 'Dystopian Fiction',
    stock: 20
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 8.99,
    coverImage: 'https://source.unsplash.com/random/300x400?classic',
    description: 'A romantic novel that follows the emotional development of Elizabeth Bennet in 19th century England.',
    isbn: '9780141439518',
    publisher: 'Penguin Classics',
    publicationDate: '1813-01-28',
    pages: 432,
    category: 'Romance',
    stock: 8
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 14.99,
    coverImage: 'https://source.unsplash.com/random/300x400?fantasy',
    description: 'A fantasy novel about the adventures of Bilbo Baggins on a quest to help dwarves reclaim their treasure.',
    isbn: '9780547928227',
    publisher: 'Houghton Mifflin Harcourt',
    publicationDate: '1937-09-21',
    pages: 300,
    category: 'Fantasy',
    stock: 25
  }
];

module.exports = books;
