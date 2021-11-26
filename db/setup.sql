-- CREATE DATABASE goal_tracker;

CREATE TABLE users(
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

-- CREATE TABLE goals(
--   gid BIGSERIAL PRIMARY KEY,
--   type TEXT,
--   description TEXT,
--   completed BOOLEAN,
-- );