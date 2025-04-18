-- ============================
-- CREACIÓN DE TABLAS
-- ============================

-- Tabla: Companies
CREATE TABLE Companies (
  company_id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  company_rut VARCHAR(20) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  address_street VARCHAR(255),
  address_city VARCHAR(100),
  address_state VARCHAR(100),
  address_zip VARCHAR(20)
);

-- Tabla: Roles
CREATE TABLE Roles (
  role_id SERIAL PRIMARY KEY,
  role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla: Users
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  rut VARCHAR(20) UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  company_id INT REFERENCES Companies(company_id),
  role_id INT REFERENCES Roles(role_id)
);

-- Tabla: Stores
CREATE TABLE Stores (
  store_id SERIAL PRIMARY KEY,
  store_name VARCHAR(255) NOT NULL,
  coord_latitude DECIMAL(10, 8),
  coord_longitude DECIMAL(11, 8),
  address_street VARCHAR(255),
  address_city VARCHAR(100),
  address_state VARCHAR(100),
  address_zip VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  company_id INT REFERENCES Companies(company_id)
);

-- Tabla: Categories
CREATE TABLE Categories (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla: Colors
CREATE TABLE Colors (
  color_id SERIAL PRIMARY KEY,
  color_name VARCHAR(50) UNIQUE NOT NULL,
  color_code VARCHAR(20) UNIQUE NOT NULL
);

-- Tabla: Products
CREATE TABLE Products (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  category_id INT REFERENCES Categories(category_id),
  color_id INT REFERENCES Colors(color_id)
);

-- Tabla: Store_Products
CREATE TABLE Store_Products (
  store_id INT REFERENCES Stores(store_id),
  product_id INT REFERENCES Products(product_id),
  quantity INT DEFAULT 0,
  PRIMARY KEY (store_id, product_id)
);

-- Tabla: Sales
CREATE TABLE Sales (
  sale_id SERIAL PRIMARY KEY,
  sale_number VARCHAR(50) UNIQUE NOT NULL,
  sale_date TIMESTAMP NOT NULL DEFAULT NOW(),
  sale_total DECIMAL(10, 2),
  user_id INT REFERENCES Users(user_id),
  store_id INT REFERENCES Stores(store_id)
);

-- Tabla: Sale_Items
CREATE TABLE Sale_Items (
  sale_id INT REFERENCES Sales(sale_id) ON DELETE CASCADE,
  product_id INT REFERENCES Products(product_id),
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (sale_id, product_id)
);
