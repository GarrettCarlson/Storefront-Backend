CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price real,
    category VARCHAR(100)
);
INSERT INTO products (id, name, price, category)
VALUES (1, 'Jellyfishing Net', 1.1, 'Sporting Goods'),
       (2, '#1 Hat', 2.1, 'Apparel'),
       (3, 'Secret Formula', 3.1, 'Food');