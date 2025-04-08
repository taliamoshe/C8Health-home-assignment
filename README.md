###  Knowledge Item Management API
A RESTful API server for managing knowledge items and associated tags.  
Built with **Node.js**, **Express**, **Sequelize**, and **SQLite**.

# Setup Instructions
1. Clone the repository
git clone https://github.com/taliamoshe/C8Health-home-assignment
cd C8Health-home-assignment

2. Install dependencies
npm install 

3. Run database migrations
npx sequelize-cli db:migrate

4. Run the server
node server.js / npx nodemon server.js

# Tech Stack & Database Choice
Backend: Node.js, Express.js
ORM: Sequelize
Database: SQLite
Validation: Joi
Testing: Manual testing with curl or Postman

**I used SQLite because it's simple and works well for small projects.
For applications that require scalability, concurrent writes, or deployment to multiple instances, I would use a database like PostgreSQL, MySQL, or MongoDB.**

# API Design Overview
CREATE: /home_assigment/v1/                     - POST    create a new knowledge item
READ:   /home_assigment/v1/                     - GET     get all items  
        /home_assigment/v1/:id                  - GET     get specific item by ID  
        /home_assigment/v1/title/:text          - GET     find items by title  
        /home_assigment/v1/subtitle/:text       - GET     find items by subtitle  
        /home_assigment/v1/tag/:tag              - GET     find items by tag  
        /home_assigment/v1/:id/version           - GET     get previous version of an item 
        /home_assigment/v1/filter-by-tags?tags=a&tags=b   - GET     get items matching all given tags
UPDATE: /home_assigment/v1/:id                  - PATCH   update item by ID 
DELETE: /home_assigment/v1/:id                  - DELETE  delete item by ID  


# Validation
Each request to create or update an item is validated using Joi, and must include:
title (string, required)
subtitle (string, required)
vettedDate (date, required)
content (string, required)
tags (array of numeric IDs, optional)

# Indexing
Indexes are automatically created on primary keys (`KnowledgeItem_id`, `tag_id`) and the connection table (`KnowledgeItemTags`) to optimize performance on queries and associations.  
The `tag` field is also indexed as a `UNIQUE` constraint to prevent duplicates and allow fast lookup.

# Versioning
Each time a knowledge item is updated, a copy of its previous state is saved to a separate VersionHistory table. The endpoint 
/home_assigment/v1/:id/version allows retrieving past versions of a specific item.

# Bonus Features
Version history tracking
Logger to track any suspicious action

# Sample API Request:
## Create a new Knowledge Item
curl -X POST http://localhost:3000/home_assigment/v1/ \
-H "Content-Type: application/json" \
-d '{
  "title": "Unique Title",
  "subtitle": "Test Subtitle",
  "content": "Test content from cURL",
  "vettedDate": "2025-04-03",
  "tags": [1, 2]
}'
## Get all Knowledge Items
curl http://localhost:3000/home_assigment/v1/
## Get a specific item by ID
curl http://localhost:3000/home_assigment/v1/100
## Filter by tags (AND logic)
curl "http://localhost:3000/home_assigment/v1/filter-by-tags?tags=pediatrics&tags=psychiatry"
## Update an existing item
curl -X PATCH http://localhost:3000/home_assigment/v1/100 \
-H "Content-Type: application/json" \
-d '{
  "subtitle": "Updated subtitle",
  "content": "Updated content"
}'
## Delete an item
curl -X DELETE http://localhost:3000/home_assigment/v1/100

# Entity-Relationship Diagram (ERD)
![ERD](images/knowledge-item-erd.png)


# Author
Created by Talia Moshe
