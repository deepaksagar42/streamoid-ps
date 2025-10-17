const express = require("express");
const dotenv = require("dotenv");
const initDB = require('./db.js');
const productRoutes = require('./Routes/productroutes.js');

const app = express();
app.use(express.json());

const port = 8000;

async function startServer() {
    const db = await initDB(); 
    app.set("db", db);

    app.use("/", productRoutes);

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}
  
startServer();
