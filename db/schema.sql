CREATE DATABASE movies_db;
USE movies_db;

CREATE TABLE movies(
	id INT AUTO_INCREMENT PRIMARY KEY,
	movie_name TEXT,
	watched BOOLEAN DEFAULT 0,
	date TIMESTAMP
);
