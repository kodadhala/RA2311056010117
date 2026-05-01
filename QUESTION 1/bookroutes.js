const express = require("express");
const router = express.Router();
const service = require("./bookservice");

router.post("/", (req, res) => {
  try {
    res.json(service.addBook(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/", (req, res) => {
  res.json(service.getAll());
});

router.get("/:id", (req, res) => {
  const book = service.getById(req.params.id);
  if (!book) return res.status(404).json({ error: "Not found" });
  res.json(book);
});

router.post("/borrow/:id", (req, res) => {
  try {
    res.json(service.borrow(req.params.id));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    res.json(service.deleteBook(req.params.id));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
