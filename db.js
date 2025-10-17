const sqlite3=  require("sqlite3");
const {open} =  require("sqlite");

 async function initDB() {
  const db = await open({
    filename: "./products.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      sku TEXT PRIMARY KEY,
      name TEXT,
      brand TEXT,
      color TEXT,
      size TEXT,
      mrp REAL,
      price REAL,
      quantity INTEGER
    )
  `);

  return db;
}
module.exports=initDB;