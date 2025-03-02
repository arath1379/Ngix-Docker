-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS mi_base_de_datos;

-- Seleccionar la base de datos
USE mi_base_de_datos;

-- Crear la tabla 'usuarios'
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Insertar datos de ejemplo en la tabla 'usuarios'
INSERT INTO usuarios (nombre, email) VALUES
('Juan Pérez', 'juan@example.com'),
('Ana Gómez', 'ana@example.com'),
('Carlos Díaz', 'carlos@example.com'),
('Laura Martínez', 'laura@example.com');
