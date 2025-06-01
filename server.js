// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");
// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // Database connection setup
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "mantralaya@2006", // <-- Add your MySQL password if set
//   database: "generations_db",
// });
// db.connect((err) => {
//   if (err) {
//     console.error("❌ MySQL connection failed:", err);
//     return;
//   }
//   console.log("✅ Connected to MySQL database");
// });
// app.get("/api/generations", (req, res) => {
//   db.query("SELECT * FROM generations", (err, results) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json(results);
//   });
// });
// app.get("/api/generation/:name", (req, res) => {
//   const name = decodeURIComponent(req.params.name);
//   db.query(
//     "SELECT * FROM generations WHERE name = ?",
//     [name],
//     (err, results) => {
//       if (err) return res.status(500).json({ error: err });
//       res.json(results[0] || {});
//     }
//   );
// });
// app.get("/api/compare", (req, res) => {
//   const { from, to, field } = req.query;

//   if (!from || !to || !field) {
//     return res.status(400).json({ error: "Missing required query parameters" });
//   }

//   // Map frontend field names to database columns
//   const fieldMap = {
//     income: "avg_income",
//     education: "education_level",
//     tech: "tech_adoption_score",
//     socialmedia: "social_media_usage",
//     environmentalawareness: "environmental_awareness",
//   };

//   const dbField = fieldMap[field];
//   if (!dbField) {
//     return res.status(400).json({ error: "Invalid comparison field" });
//   }

//   const query = `
//     SELECT name, ${dbField} AS value
//     FROM generations
//     WHERE name IN (?, ?)
//     ORDER BY FIELD(name, ?, ?)
//   `;

//   db.query(query, [from, to, from, to], (err, results) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ error: "Database query failed" });
//     }

//     if (results.length !== 2) {
//       const missing = [];
//       if (!results.some((r) => r.name === from)) missing.push(from);
//       if (!results.some((r) => r.name === to)) missing.push(to);
//       return res.status(404).json({
//         error: "Generations not found",
//         missing: missing.join(", "),
//       });
//     }

//     const response = {
//       [from]: results.find((r) => r.name === from).value,
//       [to]: results.find((r) => r.name === to).value,
//     };

//     res.json(response);
//   });
// });
// app.use(express.static(__dirname));

// // Start the server
// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mantralaya@2006",
  database: "generations_db",
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Route to fetch generations data
app.get("/generations", (req, res) => {
  const query = `SELECT name, birth_range, avg_income, education_level, tech_adoption_score, social_media_usage, environmental_awareness FROM generations`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// ✅ Route for comparison logic
app.get("/api/compare", (req, res) => {
  const { from, to, field } = req.query;

  if (!from || !to || !field) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  const fieldMap = {
    income: "avg_income",
    education: "education_level",
    tech: "tech_adoption_score",
    socialmedia: "social_media_usage",
    environmentalawareness: "environmental_awareness",
  };

  const dbField = fieldMap[field];
  if (!dbField) {
    return res.status(400).json({ error: "Invalid comparison field" });
  }

  const query = `
    SELECT name, ${dbField} AS value
    FROM generations
    WHERE name IN (?, ?)
    ORDER BY FIELD(name, ?, ?)
  `;

  db.query(query, [from, to, from, to], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length !== 2) {
      const missing = [];
      if (!results.some((r) => r.name === from)) missing.push(from);
      if (!results.some((r) => r.name === to)) missing.push(to);
      return res.status(404).json({
        error: "Generations not found",
        missing: missing.join(", "),
      });
    }

    const response = {
      [from]: results.find((r) => r.name === from).value,
      [to]: results.find((r) => r.name === to).value,
    };

    res.json(response);
  });
});

// Serve static files (if needed)
app.use(express.static(__dirname));

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
