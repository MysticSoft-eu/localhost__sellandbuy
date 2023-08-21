// login.js
const express = require("express");
const router = express.Router();

// Obsługa żądania logowania
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // TODO: Sprawdź poprawność danych logowania w bazie danych
  // TODO: Wygeneruj token uwierzytelniający

  res.send("Login successful");
});

module.exports = router;
