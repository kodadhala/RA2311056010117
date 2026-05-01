const Book = require("./books");

class BookService {
  constructor() {
    this.books = [];
  }

  addBook(data) {
    const exists = this.books.find(b => b.id === data.id);
    if (exists) throw new Error("Book exists");

    const book = new Book(data.id, data.title, data.author);
    this.books.push(book);
    return book;
  }

  getAll() {
    return this.books;
  }

  getById(id) {
    return this.books.find(b => b.id === id);
  }

  borrow(id) {
    const book = this.getById(id);
    if (!book) throw new Error("Not found");
    if (!book.available) throw new Error("Already borrowed");

    book.available = false;
    return book;
  }

  deleteBook(id) {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) throw new Error("Not found");
    this.books.splice(index, 1);
    return { msg: "Deleted" };
  }
}

module.exports = new BookService();
