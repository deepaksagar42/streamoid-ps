const fs = require("fs");
const csv = require("csv-parser");

const uploadCSV = async (req, res) => {
  const db = req.app.get("db");
  const results = [];
  const failed = [];
            
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      const { sku, name, brand, color, size, mrp, price, quantity } = row;

      if (!sku || !name || !brand || !mrp || !price) {
        failed.push({ row, reason: "Missing required field" });
        return;
      }
      if (Number(price) > Number(mrp)) {
        failed.push({ row, reason: "Price > MRP" });
        return;
      }
      if (Number(quantity) < 0) {
        failed.push({ row, reason: "Negative quantity" });
        return;
      }

      results.push({
        sku,
        name,
        brand,
        color,
        size,
        mrp: Number(mrp),
        price: Number(price),
        quantity: Number(quantity),
      });
    })
    .on("end", async () => {
      for (const p of results) {
        try {
          await db.run(
            `INSERT OR REPLACE INTO products 
            (sku, name, brand, color, size, mrp, price, quantity)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [p.sku, p.name, p.brand, p.color, p.size, p.mrp, p.price, p.quantity]
          );
        } catch (err) {
          failed.push({ row: p, reason: err.message });
        }
      }

      fs.unlinkSync(req.file.path);
      res.json({ stored: results.length - failed.length, failed });
    });
};

const listProducts = async (req, res) => {
  const db = req.app.get("db");
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const products = await db.all("SELECT * FROM products LIMIT ? OFFSET ?", [
    limit,
    offset,
  ]);
  res.json(products);
};

const searchProducts = async (req, res) => {
  const db = req.app.get("db");
  const { brand, color, minPrice, maxPrice } = req.query;

  let query = "SELECT * FROM products WHERE 1=1";
  const params = [];

  if (brand) {
    query += " AND brand = ?";
    params.push(brand);
  }
  if (color) {
    query += " AND color = ?";
    params.push(color);
  }
  if (minPrice) {
    query += " AND price >= ?";
    params.push(minPrice);
  }
  if (maxPrice) {
    query += " AND price <= ?";
    params.push(maxPrice);
  }

  const products = await db.all(query, params);
  res.json(products);
};

module.exports = { uploadCSV,listProducts,searchProducts }; 
