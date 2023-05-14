/* Replace with your SQL commands */
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price numeric,
    category VARCHAR(100)
);
-- INSERT INTO products (id, name, price, category)
-- VALUES (1, 'Product_1', 1.1, 'General'),
--        (2, 'Product_2', 2.2, 'General'),
--        (3, 'Product_3', 3.3, 'General');