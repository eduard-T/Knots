CREATE DATABASE goal_tracker;

CREATE TABLE users(
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE goals(
  gid BIGSERIAL PRIMARY KEY,
  user_id BIGINT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  timeline VARCHAR(10) NOT NULL,
  description VARCHAR(50) NOT NULL,
  completed BOOLEAN
);