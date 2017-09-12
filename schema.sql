drop DATABASE IF EXISTS testdb;

CREATE DATABASE testdb;

USE testdb;

CREATE TABLE users (
  id int(10) NOT NULL AUTO_INCREMENT,
  person VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO users (person) VALUES
('jake'),('bob');