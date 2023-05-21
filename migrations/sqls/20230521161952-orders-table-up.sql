CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    status VARCHAR(8)
);
INSERT INTO orders (id, user_id, status)
VALUES (1, 1, 'pending'),
        (2, 2, 'pending'),
        (3, 1, 'pending');