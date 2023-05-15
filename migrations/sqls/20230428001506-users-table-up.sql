CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    password_digest VARCHAR
);
-- INSERT INTO users (id, firstName, lastName, password_digest)
-- VALUES (1, 'Spongebob', 'Squarepants', 'aerghsertbhsdrtnhsetrn'),
--        (1, 'Patrick', 'Star', 'aerghsertsdfgnhsetrn'),
--        (1, 'Sandy', 'Cheeks', 'aerghsguiklrtnhsetrn');