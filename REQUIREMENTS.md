# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products
GET /products - Index
GET /products/:product_id - Show
POST /products - Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users
GET /users - Index [token required]
GET /users/:user_id - Show [token required]
POST /users - Create N[token required]

#### Orders
GET /orders/:user_id - Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
| Column Name | Data Type | Constraints |
| ----------- | --------- | ----------- |
| id          | serial    | PRIMARY KEY |
| name        | varchar   |             |
| price       | numeric   |             |
| category    | varchar   |             |
- id
- name
- price
- [OPTIONAL] category

#### User
| Column Name    | Data Type | Constraints |
| -------------- | --------- | ----------- |
| id             | serial    | PRIMARY KEY |
| firstName      | varchar   |             |
| lastName       | numeric   |             |
| password_digest| varchar   |             |
- id
- firstName
- lastName
- password

#### Orders
| Column Name | Data Type | Constraints           |
| ----------- | --------- | --------------------- |
| id          | serial    | PRIMARY KEY           |
| user_id     | varchar   | FOREIGN KEY users(id) |
| status      | varchar   |                       |
- id
- user_id
- status of order (active or complete)

#### Order Products
| Column Name | Data Type | Constraints              |
| ----------- | --------- | ------------------------ |
| id          | serial    | PRIMARY KEY              |
| order_id    | bigint    | FOREIGN KEY orders(id)   |
| product_id  | bigint    | FOREIGN KEY products(id) |
| quantity    | integer   |                          |
- id of each product in the order
- quantity of each product in the order