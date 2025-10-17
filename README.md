 ## Features:->
✅ Upload product data using a CSV file
✅ Validate each product record (missing or invalid data)
✅ Store valid products in a database (SQLite by default)
✅ List all products with pagination
✅ Filter/search products by brand, color, or price range
✅ Dockerized for easy deployment

## Tech Stack
.Node.js (Express.js) – Backend framework
.SQLite3 – Lightweight local database
.Multer – File upload handling
.CSV-Parser – Parsing CSV files
.Docker – Containerization

## Set up Instruction

1️⃣ Clone the repository
git clone https://github.com/deepaksagar42/streamoid-ps.git
cd streamoid-ps

2️⃣ Install dependencies
npm install

3️⃣ Run locally
npm start

4️⃣ Using Docker (Optional)
docker build -t streamoid-backend .
docker run -p 8000:8000 streamoid-backend


## API Documentation

1️⃣ Upload CSV
POST /upload
Description:
Uploads a product CSV, validates data, and stores valid rows in the database.
Example Request:->
curl -X POST -F "file=@products.csv" http://localhost:8000/upload

2️⃣ List Products
GET /products?page=1&limit=10
Description:
Lists all products stored in the database with pagination.

3️⃣ Search / Filter Products
GET /products/search
Lists all products stored in the database with specific filters.
eg:->GET /products/search?brand=BloomWear&maxPrice=2500


## Testing the APIs
You can test the endpoints using:
Postman / Insomnia
curl (command line)

Example:
curl http://localhost:8000/products
