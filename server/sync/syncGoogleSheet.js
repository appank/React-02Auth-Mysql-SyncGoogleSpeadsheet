const { google } = require("googleapis");
const db = require("../config/db");
const credentials = require("../sampelproduct-fef4a9b76d28.json");
require("dotenv").config();

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

async function getSheetData(range) {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range,
  });

  const rows = res.data.values;
  if (!rows || rows.length <= 1) {
    throw new Error(`Data kosong di range: ${range}`);
  }

  return {
    headers: rows[0],
    data: rows.slice(1),
  };
}

async function insertDataToTable(table, headers, rows) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Kosongkan tabel dulu (opsional)
    await connection.query(`DELETE FROM ${table}`);

    for (const row of rows) {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i] || null;
      });

      const columns = Object.keys(obj).join(", ");
      const placeholders = Object.keys(obj).map(() => "?").join(", ");
      const values = Object.values(obj);

      await connection.query(
        `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
        values
      );
    }

    await connection.commit();
    console.log(`✅ Sync ke tabel '${table}' berhasil`);
  } catch (err) {
    await connection.rollback();
    console.error(`❌ Gagal sync ke tabel '${table}':`, err.message);
  } finally {
    connection.release();
  }
}

async function syncGoogleSheets() {
  try {
    // Sync Sheet1 ke tabel profil
    const sheet1 = await getSheetData("Sheet1!A1:C");
    await insertDataToTable("profil", sheet1.headers, sheet1.data);

    // Sync Sheet2 ke tabel assets
    const sheet2 = await getSheetData("Sheet2!A1:E");
    await insertDataToTable("assets", sheet2.headers, sheet2.data);
  } catch (err) {
    console.error("❌ Gagal sync Google Sheets:", err.message);
  }
}

module.exports = syncGoogleSheets;
