CREATE DATABASE IF NOT EXISTS sportify;
USE sportify;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  imageUrl VARCHAR(512)
);

CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  productId INT NOT NULL,
  qty INT DEFAULT 1,
  UNIQUE KEY user_product (userId, productId),
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  status VARCHAR(64) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orderId INT NOT NULL,
  productId INT NOT NULL,
  qty INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (orderId) REFERENCES orders(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);

INSERT INTO products(name, description, price, imageUrl) VALUES
('Cricket Bat', 'English willow bat', 4999.00, 'https://picsum.photos/seed/bat/600/400'),
('Football', 'Size 5 match ball', 1499.00, 'https://picsum.photos/seed/football/600/400'),
('Tennis Racket', 'Graphite frame', 2999.00, 'https://picsum.photos/seed/racket/600/400'),
('Running Shoes', 'Lightweight trainers', 3999.00, 'https://picsum.photos/seed/shoes/600/400');
