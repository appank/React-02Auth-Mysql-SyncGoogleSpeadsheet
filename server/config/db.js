const mysql = require("mysql2/promise");
require('dotenv').config();

// const db = mysql.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "02auth",
// });
const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.query("SELECT 1")
  .then(() => console.log("✅ Connected to MySQL"))
  .catch((err) => console.error("❌ MySQL connection error:", err));

module.exports = db;