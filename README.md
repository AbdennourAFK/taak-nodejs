# Blogify API

A database-driven REST API built with Node.js, Express, and MongoDB for managing blog posts and comments.

## Project Structure

```
blogify-node/
├── server.js                 # Main application entry point
├── package.json              # Node.js project configuration and dependencies
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   ├── BlogPost.js          # BlogPost database model/schema
│   └── Comment.js           # Comment database model/schema
├── controllers/
│   ├── blogpostController.js # Request handlers for blog post operations
│   └── commentController.js  # Request handlers for comment operations
└── routes/
    ├── index.js             # Root route with API documentation
    ├── blogposts.js         # Blog post API routes
    └── comments.js          # Comment API routes
```

## File Descriptions

### server.js
The main entry point of the application. It sets up Express, connects to MongoDB, configures middleware, and mounts the route handlers.

### config/database.js
Handles the MongoDB connection. You'll need to update the connection string for your MongoDB instance (local or MongoDB Atlas).

### models/
These files define the database schemas using Mongoose:
- **BlogPost.js**: Defines the structure of blog posts (title, content, author, timestamps)
- **Comment.js**: Defines the structure of comments (blogPostId reference, author, content, timestamps)

### controllers/
These files contain the business logic for handling requests:
- **blogpostController.js**: Implements CRUD operations for blog posts, including pagination and search
- **commentController.js**: Implements CRUD operations for comments, including pagination and filtering

### routes/
These files define the API endpoints:
- **index.js**: Serves an HTML page documenting all API endpoints at the root URL (/)
- **blogposts.js**: Defines routes for /api/blogposts endpoints
- **comments.js**: Defines routes for /api/comments endpoints

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure MongoDB:**
   - For local MongoDB: Update `config/database.js` or set `MONGODB_URI` environment variable
   - Default connection: `mongodb://localhost:27017/blogify`
   - For MongoDB Atlas: Set `MONGODB_URI` to your Atlas connection string

3. **Start the server:**
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Access the API:**
   - API Documentation: http://localhost:3000/
   - API Base URL: http://localhost:3000/api

## API Features

### Blog Posts
- **List** (GET /api/blogposts): Supports pagination (limit, offset) and search
- **Detail** (GET /api/blogposts/:id): Get a single blog post
- **Create** (POST /api/blogposts): Create a new blog post with validation
- **Update** (PUT /api/blogposts/:id): Update an existing blog post
- **Delete** (DELETE /api/blogposts/:id): Delete a blog post

### Comments
- **List** (GET /api/comments): Supports pagination and filtering by blogPostId
- **Detail** (GET /api/comments/:id): Get a single comment
- **Create** (POST /api/comments): Create a new comment with validation
- **Update** (PUT /api/comments/:id): Update an existing comment
- **Delete** (DELETE /api/comments/:id): Delete a comment

## Requirements Met

✅ Two entities (BlogPost and Comment) with full CRUD operations  
✅ Basic validation (required fields, data types)  
✅ Pagination support (limit and offset query parameters)  
✅ Search functionality (on blog posts)  
✅ Root route (/) returns HTML API documentation  
✅ Correct HTTP verbs (GET, POST, PUT, DELETE)  
✅ Node.js 20+ compatible  
✅ Express framework  
✅ MongoDB database connection  

## Example API Calls

### Create a blog post:
```bash
POST http://localhost:3000/api/blogposts
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my blog post.",
  "author": "John Doe"
}
```

### List blog posts with pagination and search:
```bash
GET http://localhost:3000/api/blogposts?limit=5&offset=0&search=first
```

### Create a comment:
```bash
POST http://localhost:3000/api/comments
Content-Type: application/json

{
  "blogPostId": "507f1f77bcf86cd799439011",
  "content": "Great post!",
  "author": "Jane Smith"
}
```

