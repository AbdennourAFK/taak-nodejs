const express = require('express');
const router = express.Router();

// GET / - Root route with API documentation
router.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blogify API Documentation</title>
</head>
<body>
    <h1>Blogify API Documentation</h1>
    <p>Welcome to the Blogify API. This API provides endpoints for managing blog posts and comments.</p>
    
    <h2>Blog Posts Endpoints</h2>
    <ul>
        <li>
            <strong>GET /api/blogposts</strong> - List all blog posts
            <ul>
                <li>Query parameters: limit (default: 10), offset (default: 0), search (optional), sort (optional), order (optional: asc or desc)</li>
                <li>Search: Searches across title, content, author, and category fields</li>
                <li>Sort: Sort by any field (title, content, author, category, createdAt, updatedAt)</li>
                <li>Examples: 
                    <ul>
                        <li><code>GET /api/blogposts?limit=5&offset=0&search=example</code></li>
                        <li><code>GET /api/blogposts?sort=title&order=asc</code></li>
                        <li><code>GET /api/blogposts?search=tech&sort=createdAt&order=desc</code></li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>
            <strong>GET /api/blogposts/:id</strong> - Get a single blog post by ID
            <ul>
                <li>Example: <code>GET /api/blogposts/507f1f77bcf86cd799439011</code></li>
            </ul>
        </li>
        <li>
            <strong>POST /api/blogposts</strong> - Create a new blog post
            <ul>
                <li>Body (JSON): { "title": "string", "content": "string", "author": "string", "category": "string" }</li>
                <li>All fields are required</li>
                <li>Category must be one of: Tech, Lifestyle, News</li>
            </ul>
        </li>
        <li>
            <strong>PUT /api/blogposts/:id</strong> - Update a blog post
            <ul>
                <li>Body (JSON): { "title": "string", "content": "string", "author": "string", "category": "string" }</li>
                <li>All fields are optional</li>
                <li>Category must be one of: Tech, Lifestyle, News (if provided)</li>
            </ul>
        </li>
        <li>
            <strong>DELETE /api/blogposts/:id</strong> - Delete a blog post
            <ul>
                <li>Example: <code>DELETE /api/blogposts/507f1f77bcf86cd799439011</code></li>
            </ul>
        </li>
    </ul>
    
    <h2>Comments Endpoints</h2>
    <ul>
        <li>
            <strong>GET /api/comments</strong> - List all comments
            <ul>
                <li>Query parameters: limit (default: 10), offset (default: 0), blogPostId (optional)</li>
                <li>Example: <code>GET /api/comments?limit=5&offset=0&blogPostId=507f1f77bcf86cd799439011</code></li>
            </ul>
        </li>
        <li>
            <strong>GET /api/comments/:id</strong> - Get a single comment by ID
            <ul>
                <li>Example: <code>GET /api/comments/507f1f77bcf86cd799439011</code></li>
            </ul>
        </li>
        <li>
            <strong>POST /api/comments</strong> - Create a new comment
            <ul>
                <li>Body (JSON): { "blogPostId": "string", "content": "string", "author": "string" }</li>
                <li>All fields are required</li>
            </ul>
        </li>
        <li>
            <strong>PUT /api/comments/:id</strong> - Update a comment
            <ul>
                <li>Body (JSON): { "content": "string", "author": "string" }</li>
                <li>All fields are optional</li>
            </ul>
        </li>
        <li>
            <strong>DELETE /api/comments/:id</strong> - Delete a comment
            <ul>
                <li>Example: <code>DELETE /api/comments/507f1f77bcf86cd799439011</code></li>
            </ul>
        </li>
    </ul>
    
    <h2>Features</h2>
    <ul>
        <li>Full CRUD operations for both entities</li>
        <li>Pagination support (limit and offset)</li>
        <li>Advanced search functionality on blog posts (title, content, author, category)</li>
        <li>Sorting support (sort by any field with ascending/descending order)</li>
        <li>Category validation for blog posts (Tech, Lifestyle, News)</li>
        <li>Basic validation for required fields and data types</li>
    </ul>
</body>
</html>
  `;
  res.send(html);
});

module.exports = router;

