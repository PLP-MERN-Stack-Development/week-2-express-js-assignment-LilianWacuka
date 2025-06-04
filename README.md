[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19697115&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Instructions To Run Assignment
. Clone the repository:
   ```
   git clone <https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-LilianWacuka.git>
   cd <your-project-folder>
   ```

2. Install dependencies:
   ```
   npm install 
   npm init -y
   ```

3. Create a `.env` file based on `.env.example` and fill in your values.

4. Start the server:
   ```
   1. install nodemon for server persistent
   use pnpm add nodemon
   npm start
   ```
   The server will run on `http://localhost:3000` by default.


## .env file
```
PORT=3000
MONGO_URI=mongodb://localhost:YOUR URL
API_KEY=.....your/APIKEY
```
## Documentation of API endpoints
### Authentication
All endpoints (except `/`) require an API key in the header:
```
x-api-key: ''''
```

### Product Routes

| Method | Endpoint                   | Description                        |
|--------|----------------------------|------------------------------------|
| GET    | `/api/products`            | List all products (supports filtering and pagination) |
| GET    | `/api/products/:id`        | Get a product by ID                |
| POST   | `/api/products`            | Create a new product               |
| PUT    | `/api/products/:id`        | Update a product                   |
| DELETE | `/api/products/:id`        | Delete a product                   |
| GET    | `/api/products/search`     | Search products by name            |
| GET    | `/api/products/stats`      | Get product count by category      |

#### Query Parameters

- `category` (GET `/api/products`): Filter by category  
  Example: `/api/products?category=electronics`
- `page` and `limit` (GET `/api/products`): Pagination  
  Example: `/api/products?page=2&limit=5`
- `name` (GET `/api/products/search`): Search by name  
  Example: `/api/products/search?name=mouse`

## 📦 Example Requests

### Create a Product

**POST** `/api/products`
```json
Headers:
  x-api-key: your-api-key
  Content-Type: application/json

Body:
{
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```

### Get Products by Category

**GET** `/api/products?category=electronics`

### Search Products by Name

**GET** `/api/products/search?name=mouse`
### Get Product Statistics

**GET** `/api/products/stats`

---

---

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 