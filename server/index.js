const express = require("express");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");
const cron = require("node-cron");
const NodeCache = require("node-cache");

dotenv.config();
require("./passport"); // Konfigurasi passport
const authRoutes = require("./routes/auth");
const syncGoogleSheets = require("./sync/syncGoogleSheet");
const db = require("./config/db");

const app = express();
const cache = new NodeCache({ stdTTL: 300 }); // Cache selama 5 menit
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send("✅ API is running!");
});

// =======================
// ENDPOINT FRONTEND
// =======================

// Ambil data profil dari MySQL
app.get("/profil", async (req, res) => {
  try {
    const cached = cache.get("profil");
    if (cached) return res.json(cached);

    const [rows] = await db.query("SELECT * FROM profil");
    cache.set("profil", rows);
    res.json(rows);
  } catch (err) {
    console.error("MySQL profil error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Ambil data assets dari MySQL
app.get("/assets", async (req, res) => {
  try {
    const cached = cache.get("assets");
    if (cached) return res.json(cached);

    const [rows] = await db.query("SELECT * FROM assets");
    cache.set("assets", rows);
    res.json(rows);
  } catch (err) {
    console.error("MySQL assets error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// =======================
// SYNC
// =======================

// Manual sync
app.get("/sync", async (req, res) => {
  try {
    await syncGoogleSheets();
    cache.del("profil");
    cache.del("assets");
    res.json({ message: "✅ Sync success!" });
  } catch (err) {
    console.error("Sync error:", err);
    res.status(500).json({ message: "Sync failed" });
  }
});

// Auto sync setiap 5 menit
cron.schedule("*/5 * * * *", async () => {
  console.log("⏱️ Auto-sync start...");
  await syncGoogleSheets();
  cache.del("profil");
  cache.del("assets");
});

// =======================
// START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  // Jalankan sync pertama kali saat server hidup
  syncGoogleSheets();
});
