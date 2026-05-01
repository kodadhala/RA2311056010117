const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <h1>Book API is running</h1>
    <p>Use the API routes below:</p>
    <ul>
      <li><a href="/books">GET /books</a></li>
      <li><a href="/books/1">GET /books/1</a> (replace 1 with a real ID)</li>
      <li>POST /books (use REST client to add a book)</li>
      <li>POST /books/borrow/1 (borrow a book)</li>
      <li>DELETE /books/1 (delete a book)</li>
    </ul>
    <p>Open <code>QUESTION 1/test.http</code> in VS Code and click <strong>Send Request</strong>.</p>
  `);
});

// FIXED PATH
const bookRoutes = require("./bookroutes");

app.use("/books", bookRoutes);

app.listen(3000, () => {
  console.log("Server running...");
});