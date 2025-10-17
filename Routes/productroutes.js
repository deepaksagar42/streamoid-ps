const express =require("express");
const multer =require("multer");
const { uploadCSV,listProducts,searchProducts} = require("../Controller/productcontroller.js");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/products", listProducts);
router.get("/products/search", searchProducts);

module.exports=router;
