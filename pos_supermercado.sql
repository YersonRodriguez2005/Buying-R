-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-12-2024 a las 16:55:46
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pos_supermercado`
--
CREATE DATABASE IF NOT EXISTS `pos_supermercado` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pos_supermercado`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `cantidad_disponible` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `precio_unitario`, `cantidad_disponible`) VALUES
(4, 'manzanas', 1500.00, 20),
(5, 'Arroz Diana', 2200.00, 50),
(6, 'Lentejas La Garza', 3400.00, 30),
(7, 'Fríjoles Cargamanto Rojo Doña Pepa', 4800.00, 25),
(8, 'Maíz Pira El Granero', 2500.00, 40),
(9, 'Harina de Maíz Precocida Arepas Pan', 3000.00, 45),
(10, 'Chocolatina Jet', 1200.00, 100),
(11, 'Galletas Festival Rellenas', 2500.00, 80),
(12, 'Arequipe Alpina', 4500.00, 60),
(13, 'Chiclets Adams', 800.00, 200),
(14, 'Maní Cubierto con Chocolate Colombina', 1500.00, 70),
(15, 'Banano', 1200.00, 150),
(16, 'Piña Oro Miel', 3500.00, 40),
(17, 'Manzana Roja Chilena', 2400.00, 50),
(18, 'Uvas Verdes Sin Semilla', 5200.00, 35),
(19, 'Papaya Maradol', 2800.00, 60),
(20, 'Cebolla Cabezona Blanca', 2000.00, 80),
(21, 'Tomate Chonto', 1800.00, 100),
(22, 'Papa Criolla', 1200.00, 120),
(23, 'Zanahoria', 1500.00, 90),
(24, 'Aguacate Hass', 6000.00, 50),
(25, 'Arroz Roa', 2300.00, 60),
(26, 'Lentejas Premium Doria', 3700.00, 35),
(27, 'Fríjoles Calima Doria', 4900.00, 40),
(28, 'Garbanzo Doña Pepa', 4500.00, 25),
(29, 'Harina de Trigo La Rosa', 2800.00, 50),
(30, 'Mentas POLO', 900.00, 150),
(31, 'Galletas Saltín Noel Integral', 3000.00, 70),
(32, 'Chocolates Corona', 5500.00, 45),
(33, 'Chocoramo', 2500.00, 80),
(34, 'Bombombum Colombina', 500.00, 200),
(35, 'Mango Tommy', 3200.00, 40),
(36, 'Pera Williams', 2700.00, 30),
(37, 'Naranja Valencia', 2000.00, 100),
(38, 'Limón Tahití', 1500.00, 120),
(39, 'Fresas Frescas', 5200.00, 25),
(40, 'Brócoli', 2500.00, 50),
(41, 'Espinaca', 2000.00, 40),
(42, 'Pepino Cohombro', 1800.00, 60),
(43, 'Remolacha', 1700.00, 55),
(44, 'Lechuga Batavia', 1500.00, 70),
(45, 'Shampoo Head & Shoulders', 14000.00, 40),
(46, 'Jabón Rexona Antibacterial', 3500.00, 80),
(47, 'Papel Higiénico Familia', 18000.00, 30),
(48, 'Desodorante Dove', 12000.00, 50),
(49, 'Crema Dental Colgate Triple Acción', 8000.00, 90),
(50, 'Gaseosa Postobón Manzana', 2500.00, 100),
(51, 'Gaseosa Coca-Cola', 3000.00, 120),
(52, 'Agua Cristal Natural 600ml', 1500.00, 150),
(53, 'Jugo Hit de Mango', 2200.00, 80),
(54, 'Cerveza Club Colombia Dorada', 3000.00, 60),
(55, 'Avena Molida Alpina', 4500.00, 50),
(56, 'Harina de Plátano Natural', 5000.00, 40),
(57, 'Maíz Amarillo El Granero', 2700.00, 30),
(58, 'Quinua Blanca Andina', 8000.00, 25),
(59, 'Cuscús Integral', 7000.00, 20),
(60, 'Gomitas Trululu', 2500.00, 90),
(61, 'Arequipe Corona', 6000.00, 50),
(62, 'Manjar Blanco La Cabaña', 7500.00, 40),
(63, 'Caramelos Frunas', 1500.00, 200),
(64, 'Turrón de Coco', 5000.00, 35),
(65, 'Durazno', 4000.00, 30),
(66, 'Granadilla', 3500.00, 25),
(67, 'Guayaba Roja', 3000.00, 40),
(68, 'Ciruelas', 5000.00, 20),
(69, 'Mandarina Arrayana', 2400.00, 80),
(70, 'Calabacín', 2000.00, 50),
(71, 'Berenjena', 2500.00, 40),
(72, 'Coliflor', 3000.00, 30),
(73, 'Yuca', 1800.00, 100),
(74, 'Ajo Criollo', 1500.00, 70),
(75, 'Crema Corporal Nivea', 25000.00, 30),
(76, 'Gel Antibacterial Familia', 15000.00, 60),
(77, 'Toallas Húmedas Huggies', 12000.00, 40),
(78, 'Jabón Líquido Palmolive', 8000.00, 50),
(79, 'Protector Solar Sundown', 45000.00, 20),
(80, 'Té Hatsu Té Verde', 5000.00, 70),
(81, 'Café Juan Valdez Molido', 20000.00, 40),
(82, 'Chocolisto', 15000.00, 50),
(83, 'Leche Alquería Entera', 5000.00, 80),
(84, 'Malta Leona', 3000.00, 60),
(85, 'pera', 500.00, 30);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
