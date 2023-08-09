const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const books = [
  { id: 1, name: "Harry Potter", price: 29 },
  { id: 2, name: "Story Book", price: 18 },
  { id: 3, name: "Monospace", price: 40 },
];

app.get("/", (req, res) => {
  res.send("Hello, welcome to our app!");
});

app.get("/books", (req, res) => {
  res.send(books);
});

app.get("/books/:price", (req, res) => {
  const foundBook = books.find(
    (book) => book.price === parseInt(req.params.price)
  );
  if (!foundBook) res.status(400).send("The book you is not available yet!");
  res.send(foundBook);
});

app.post("/books", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  result = Joi.validate(req.body,schema);
  if (result.error) {
    res.send(result.error.details[0].message)
    return;
  }
  const book = {
    id: books.length + 1,
    name: req.body.name,
  };
  books.push(book);
  res.send(book);
});

app.put('/books/:id',(req,res) => {
  const book = books.find(book => book.id == parseInt(req.params.id));
  console.log(book);
  if(!book) {
    res.send("book id is invalid");
    return 
  }
  const result = validateBook(req.body);
  if(!result) {
    res.send(result.error.details[0].message)
    return;
  }
  book.name = req.body.name;
  res.send(book);
})

app.delete('/books/:id', (req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.id))
  if(!book) {
    res.send("The book was given ID is not found");
    return
  }
  const index = books.indexOf(book);
  books.splice(index,1);  
  res.send(book);
}) 

const validateBook = (object) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(object, schema);
  return result
}
app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});
