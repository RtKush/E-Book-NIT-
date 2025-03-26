
import { Book, User, CartItem } from './types';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    price: 17.99,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop',
    description: 'A powerful primer on how—and why—some products satisfy customers while others only frustrate them.',
    isbn: '978-0465050659',
    publisher: 'Basic Books',
    publicationDate: '2013-11-05',
    pages: 368,
    category: 'Design',
    stock: 15
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 21.99,
    coverImage: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=800&auto=format&fit=crop',
    description: 'An easy and proven way to build good habits and break bad ones.',
    isbn: '978-0735211292',
    publisher: 'Avery',
    publicationDate: '2018-10-16',
    pages: 320,
    category: 'Self-Help',
    stock: 22
  },
  {
    id: '3',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    price: 24.95,
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800&auto=format&fit=crop',
    description: 'A bold and provocative history of our species from a renowned historian and philosopher.',
    isbn: '978-0062316097',
    publisher: 'Harper',
    publicationDate: '2015-02-10',
    pages: 464,
    category: 'History',
    stock: 18
  },
  {
    id: '4',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    price: 19.99,
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop',
    description: 'An international bestseller exploring the two systems that drive the way we think.',
    isbn: '978-0374533557',
    publisher: 'Farrar, Straus and Giroux',
    publicationDate: '2013-04-02',
    pages: 499,
    category: 'Psychology',
    stock: 12
  },
  {
    id: '5',
    title: 'Dune',
    author: 'Frank Herbert',
    price: 18.95,
    coverImage: 'https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?q=80&w=800&auto=format&fit=crop',
    description: 'The sweeping tale of a desert planet called Arrakis, the focus of an epic power struggle.',
    isbn: '978-0441172719',
    publisher: 'Ace',
    publicationDate: '1990-09-01',
    pages: 896,
    category: 'Science Fiction',
    stock: 27
  },
  {
    id: '6',
    title: 'The Art of War',
    author: 'Sun Tzu',
    price: 14.95,
    coverImage: 'https://images.unsplash.com/photo-1612878010854-1250dfc5000a?q=80&w=800&auto=format&fit=crop',
    description: 'An ancient Chinese military treatise dating from the Late Spring and Autumn Period.',
    isbn: '978-1590302255',
    publisher: 'Shambhala',
    publicationDate: '2005-01-11',
    pages: 224,
    category: 'Philosophy',
    stock: 20
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123'
  },
  {
    id: '3',
    name: 'Sidhant Chotu',
    email: 'chhotusidhant@gmail.com',
    password: 'Chotu@1234'
  }
];

// A sample cart for demonstration
export const sampleCart: CartItem[] = [
  {
    book: books[0],
    quantity: 1
  },
  {
    book: books[2],
    quantity: 2
  }
];

// In a real application, we'd use a more sophisticated authentication system
export const authenticate = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};
