const { MongoClient } = require("mongodb");

// Tworzenie połączenia z bazą danych
const uri = "mongodb+srv://kamil:lHYdCQiccbQDdwIn@cluster0.ydmzmhz.mongodb.net/?retryWrites=true&w=majority"; // URI do twojej bazy danych MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    // Nawiązanie połączenia z bazą danych
    await client.connect();
    console.log("Połączono z bazą danych MongoDB");

    // Zwrócenie referencji do połączenia
    return client.db();
  } catch (error) {
    console.error("Błąd połączenia z bazą danych MongoDB", error);
  }
}

module.exports = connectToDatabase;