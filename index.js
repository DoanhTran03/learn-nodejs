const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const books = [{ name: "Harry Potter", price: 29 }, { name : "Story Book", price: 18}, { name: "Monospace", price: 40}];

app.get("/", (req, res) => {
  res.send("Hello, welcome to our app!");
});

app.get("/books", (req, res) => {
  res.send(["Harry Potter, Space Mono, The Story"]);
});

app.get("/books/:price", (req, res) => {
  const foundBook = books.find(book => book.price === parseInt(req.params.price));
  if(!foundBook) res.status(400).send("The book you is not available yet!");
  res.send(foundBook);
});

app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});
