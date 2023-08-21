// registration.js
const express = require("express");
const router = express.Router();

// Obsługa żądania rejestracji
router.post("/register", (req, res) => {
const { email, password } = req.body;
// Logika rejestracji użytkownika
// ...
res.send("Registration successful");
});

module.exports = router;