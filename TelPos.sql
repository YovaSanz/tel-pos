-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.11.4-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para telpos
CREATE DATABASE IF NOT EXISTS `telpos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `telpos`;

-- Volcando estructura para tabla telpos.bonos_credit
CREATE TABLE IF NOT EXISTS `bonos_credit` (
  `id_bonos_credit` int(11) NOT NULL AUTO_INCREMENT,
  `id_credit` int(11) DEFAULT NULL,
  `pago` float DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `fecha_bono` datetime DEFAULT NULL,
  PRIMARY KEY (`id_bonos_credit`),
  KEY `FK_id_credit` (`id_credit`),
  CONSTRAINT `FK_id_credit` FOREIGN KEY (`id_credit`) REFERENCES `credit` (`id_cliente_compra`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla telpos.bonos_credit: ~4 rows (aproximadamente)
INSERT INTO `bonos_credit` (`id_bonos_credit`, `id_credit`, `pago`, `fecha`, `fecha_bono`) VALUES
	(1, 1, 23456, '2023-09-15', '2023-09-15 17:02:27'),
	(2, 1, 1200, '2023-09-16', '2023-09-16 18:50:01'),
	(3, 1, 900, '2023-09-16', '2023-09-16 18:50:43'),
	(4, 1, 2000, '2023-09-17', '2023-11-23 19:35:07');

-- Volcando estructura para tabla telpos.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id_cli` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) DEFAULT NULL,
  `apellidos` varchar(250) DEFAULT NULL,
  `direccion` varchar(250) DEFAULT NULL,
  `tel` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_cli`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla telpos.clientes: ~5 rows (aproximadamente)
INSERT INTO `clientes` (`id_cli`, `nombre`, `apellidos`, `direccion`, `tel`) VALUES
	(3, 'Julia', 'Diaz', 'San Fancisco, #50, tlapa de comonfort', '757109121'),
	(4, 'Felicia', 'Diaz Martinez', 'Tepeyac', '7571091201'),
	(6, 'Javier', 'Carlos Garcia', 'Aviacion 3', '7571892301'),
	(9, 'Isabel', 'Soriano Ramirez', 'Centron, Tlapa de Confort', '757698432'),
	(11, 'Jose Alejandro', 'Sanchez', 'Lazaro Cardenas, Tepeyac', '9876543212');

-- Volcando estructura para tabla telpos.cliente_compra
CREATE TABLE IF NOT EXISTS `cliente_compra` (
  `id_cliente_compra` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL DEFAULT '',
  `apellidos` char(90) NOT NULL DEFAULT '',
  `direccion` text NOT NULL,
  `tel` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_cliente_compra`),
  KEY `FK_id_cliente` (`id_cliente`),
  CONSTRAINT `FK_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cli`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla telpos.cliente_compra: ~18 rows (aproximadamente)
INSERT INTO `cliente_compra` (`id_cliente_compra`, `id_cliente`, `nombre`, `apellidos`, `direccion`, `tel`) VALUES
	(1, 3, 'Julia', 'Diaz', 'jazmin 3', '7571091201'),
	(2, 3, 'Julia', 'Diaz', 'jazmin 3', '7571091201'),
	(3, 3, 'Julia', 'Diaz', 'jazmin 3', '7571091201'),
	(4, 3, 'Julia', 'Diaz', 'jazmin 3', '7571091201'),
	(5, 3, 'Julia', 'Diaz', 'jazmin 3', '7571091201'),
	(6, 3, 'Julia', 'Diaz', 'San Fancisco, #50, tlapa de comonfort', '757109121'),
	(7, 3, 'Julia', 'Diaz', 'San Fancisco, #50, tlapa de comonfort', '757109121'),
	(8, 3, 'Julia', 'Diaz', 'San Fancisco, #50, tlapa de comonfort', '757109121'),
	(9, 3, 'Julia', 'Diaz', 'San Fancisco, #50, tlapa de comonfort', '757109121'),
	(10, 3, 'Julia', 'Diaz', 'San Fancisco, #50, tlapa de comonfort', '757109121'),
	(11, 9, 'Isabel', 'Soriano Ramirez', 'Centron, Tlapa de Confort', '757698432'),
	(12, 11, 'Jose Alejandro', 'Sanchez', 'Lazaro Cardenas, Tepeyac', '9876543212'),
	(13, 4, 'Felicia', 'Diaz Martinez', 'Tepeyac', '7571091201'),
	(14, 9, 'Isabel', 'Soriano Ramirez', 'Centron, Tlapa de Confort', '757698432'),
	(15, 3, 'Julia', 'Diaz', 'San Fancisco, #50, tlapa de comonfort', '757109121'),
	(16, 6, 'Javier', 'Carlos Garcia', 'Aviacion 3', '7571892301'),
	(17, 4, 'Felicia', 'Diaz Martinez', 'Tepeyac', '7571091201'),
	(18, 3, 'Julia', 'Diaz', 'San Fancisco, #50, tlapa de comonfort', '757109121');

-- Volcando estructura para tabla telpos.credit
CREATE TABLE IF NOT EXISTS `credit` (
  `id_credit` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente_compra` int(11) NOT NULL,
  `meses` int(11) NOT NULL,
  `intereses` float DEFAULT NULL,
  `pago_al_mes` float DEFAULT NULL,
  `abono_inicial` float DEFAULT NULL,
  `total` float DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_credit`),
  KEY `FK2_id_cliente_compra` (`id_cliente_compra`),
  CONSTRAINT `FK2_id_cliente_compra` FOREIGN KEY (`id_cliente_compra`) REFERENCES `cliente_compra` (`id_cliente_compra`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla telpos.credit: ~12 rows (aproximadamente)
INSERT INTO `credit` (`id_credit`, `id_cliente_compra`, `meses`, `intereses`, `pago_al_mes`, `abono_inicial`, `total`, `estado`) VALUES
	(1, 1, 3, 8.5, 300.5, 300.5, 9000, 'PAGADO'),
	(2, 8, 3, 10, 237.97, 237.97, 713.9, 'adeudo'),
	(3, 9, 3, 10, 54.27, 54.27, 162.8, 'adeudo'),
	(4, 10, 3, 10, 237.97, 237.97, 713.9, 'adeudo'),
	(5, 11, 3, 10, 384.45, 384.45, 1153.35, 'adeudo'),
	(6, 12, 3, 10, 54.27, 54.27, 162.8, 'adeudo'),
	(7, 13, 3, 10, 54.27, 54.27, 162.8, 'adeudo'),
	(8, 14, 3, 10, 54.27, 54.27, 162.8, 'adeudo'),
	(9, 15, 9, 10, 19.43, 19.43, 174.9, 'adeudo'),
	(10, 16, 3, 10, 54.27, 54.27, 162.8, 'adeudo'),
	(11, 17, 6, 10, 118.98, 118.98, 713.9, 'adeudo'),
	(12, 18, 3, 10, 54.27, 54.27, 162.8, 'adeudo');

-- Volcando estructura para tabla telpos.detalle_credit
CREATE TABLE IF NOT EXISTS `detalle_credit` (
  `id_detalle_credit` int(11) NOT NULL AUTO_INCREMENT,
  `id_credit` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `preciocompra` float DEFAULT NULL,
  `precioventa` float DEFAULT NULL,
  `descuento` float DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `imei` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_detalle_credit`),
  KEY `FK2_id_credit` (`id_credit`),
  KEY `FK2_id_product` (`id_product`),
  CONSTRAINT `FK2_id_credit` FOREIGN KEY (`id_credit`) REFERENCES `credit` (`id_credit`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK2_id_product` FOREIGN KEY (`id_product`) REFERENCES `productos` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla telpos.detalle_credit: ~12 rows (aproximadamente)
INSERT INTO `detalle_credit` (`id_detalle_credit`, `id_credit`, `id_product`, `cantidad`, `preciocompra`, `precioventa`, `descuento`, `descripcion`, `imei`) VALUES
	(1, 1, 11, 1, 400, 500, 0, NULL, NULL),
	(2, 1, 8, 2, 150, 200, 0, NULL, NULL),
	(3, 2, 10, 1, 550, 649, 0, 'Marca: JBL, Modelo: Tune 510BT', NULL),
	(4, 3, 11, 1, 99, 148, 0, 'Marca: EMMAR , Modelo: Generic', NULL),
	(5, 4, 10, 1, 550, 649, 0, 'Marca: JBL, Modelo: Tune 510BT', NULL),
	(6, 5, 10, 1, 550, 649, 0, 'Marca: JBL, Modelo: Tune 510BT', NULL),
	(7, 5, 33, 1, 399.5, 399.5, 0, 'Marca: STF, Modelo: Aurum', NULL),
	(8, 6, 11, 1, 99, 148, 0, 'Marca: EMMAR , Modelo: Generic', NULL),
	(9, 7, 11, 1, 99, 148, 0, 'Marca: EMMAR , Modelo: Generic', NULL),
	(10, 8, 11, 1, 99, 148, 0, 'Marca: EMMAR , Modelo: Generic', NULL),
	(11, 9, 8, 1, 130, 159, 0, 'Marca: 1HORA, Modelo: GAR064', NULL),
	(12, 10, 11, 1, 99, 148, 0, 'Marca: EMMAR , Modelo: Generic', NULL),
	(13, 11, 10, 1, 550, 649, 0, 'Marca: JBL, Modelo: Tune 510BT', NULL),
	(14, 12, 11, 1, 99, 148, 0, 'Marca: EMMAR , Modelo: Generic', NULL);

-- Volcando estructura para tabla telpos.detalle_venta
CREATE TABLE IF NOT EXISTS `detalle_venta` (
  `id_detalle_venta` int(11) NOT NULL AUTO_INCREMENT,
  `id_venta` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `precioventa` float NOT NULL DEFAULT 0,
  `preciocompra` float NOT NULL DEFAULT 0,
  `descuento` float DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id_detalle_venta`),
  KEY `FK_id_venta` (`id_venta`),
  KEY `FK_id_product` (`id_product`),
  CONSTRAINT `FK_id_product` FOREIGN KEY (`id_product`) REFERENCES `productos` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_id_venta` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id_venta`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla telpos.detalle_venta: ~82 rows (aproximadamente)
INSERT INTO `detalle_venta` (`id_detalle_venta`, `id_venta`, `id_product`, `precioventa`, `preciocompra`, `descuento`, `cantidad`, `descripcion`) VALUES
	(7, 10, 8, 159, 130, 0, 1, '1HORA, GAR064,  Cargador Micro USB V8 2.0A con Cable USB a Micro USB 10w Compatible con Android Samsung Xiaomi Huawei Motorola'),
	(8, 11, 8, 159, 130, 0, 1, '1HORA, GAR064,  Cargador Micro USB V8 2.0A con Cable USB a Micro USB 10w Compatible con Android Samsung Xiaomi Huawei Motorola'),
	(9, 12, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(10, 13, 10, 649, 550, 0, 1, 'JBL, Tune 510BT, Auriculares inalámbricos con sonido Purebass - Negro'),
	(11, 14, 10, 649, 550, 0, 1, 'JBL, Tune 510BT, Auriculares inalámbricos con sonido Purebass - Negro'),
	(12, 15, 8, 159, 130, 0, 1, '1HORA, GAR064,  Cargador Micro USB V8 2.0A con Cable USB a Micro USB 10w Compatible con Android Samsung Xiaomi Huawei Motorola'),
	(13, 16, 8, 159, 130, 0, 1, '1HORA, GAR064,  Cargador Micro USB V8 2.0A con Cable USB a Micro USB 10w Compatible con Android Samsung Xiaomi Huawei Motorola'),
	(14, 16, 10, 649, 550, 0, 1, 'JBL, Tune 510BT, Auriculares inalámbricos con sonido Purebass - Negro'),
	(15, 17, 8, 159, 130, 0, 1, '1HORA, GAR064,  Cargador Micro USB V8 2.0A con Cable USB a Micro USB 10w Compatible con Android Samsung Xiaomi Huawei Motorola'),
	(16, 17, 10, 649, 550, 0, 1, 'JBL, Tune 510BT, Auriculares inalámbricos con sonido Purebass - Negro'),
	(17, 18, 11, 148, 99, 0, 2, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(18, 19, 11, 148, 99, 0, 2, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(19, 20, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(20, 21, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(21, 22, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(22, 23, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(23, 25, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(24, 26, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(25, 27, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(26, 28, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(27, 29, 10, 649, 550, 0, 1, 'JBL, Tune 510BT, Auriculares inalámbricos con sonido Purebass - Negro'),
	(28, 29, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(29, 30, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(30, 31, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(31, 32, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(32, 33, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(33, 34, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(34, 35, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(35, 36, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(36, 37, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(37, 38, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(38, 39, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(39, 40, 11, 148, 99, 0, 1, 'EMMAR , Generic, Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(40, 42, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(41, 43, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(42, 44, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(43, 45, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(44, 46, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(45, 47, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(46, 48, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(47, 49, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(48, 50, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(49, 51, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(50, 52, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(51, 53, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(52, 54, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(53, 55, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(54, 56, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(55, 57, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(56, 58, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(57, 59, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(58, 60, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(59, 61, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(60, 62, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(61, 63, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(62, 64, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(63, 65, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(64, 66, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(65, 67, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(66, 68, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(67, 69, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(68, 70, 33, 399, 399, 0, 1, 'STF, Aurum'),
	(69, 70, 10, 649, 550, 0, 1, 'JBL, Tune 510BT'),
	(70, 71, 33, 399.5, 399.5, 0, 1, 'STF, Aurum'),
	(71, 71, 10, 649, 550, 0, 1, 'JBL, Tune 510BT'),
	(72, 72, 33, 399.5, 399.5, 0, 1, 'STF, Aurum'),
	(73, 72, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(74, 73, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(75, 74, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(76, 74, 33, 399.5, 399.5, 0, 3, 'STF, Aurum'),
	(77, 75, 11, 148, 99, 0, 2, 'EMMAR , Generic'),
	(78, 75, 33, 399.5, 399.5, 0, 2, 'STF, Aurum'),
	(79, 76, 11, 148, 99, 0, 2, 'EMMAR , Generic'),
	(80, 77, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(81, 78, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(82, 79, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(83, 80, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(84, 81, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(85, 82, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(86, 83, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(87, 84, 11, 148, 99, 0, 1, 'EMMAR , Generic'),
	(88, 85, 11, 148, 99, 0, 1, 'EMMAR , Generic');

-- Volcando estructura para tabla telpos.distribuidor
CREATE TABLE IF NOT EXISTS `distribuidor` (
  `id_dis` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `codigo` varchar(5) NOT NULL,
  `nombreem` varchar(50) NOT NULL,
  `direcem` varchar(50) NOT NULL,
  `teleem` varchar(50) NOT NULL,
  `celulares` int(10) NOT NULL,
  `fundas` int(10) NOT NULL,
  `bocinas` int(10) NOT NULL,
  `audifonos` int(10) NOT NULL,
  `micas` int(10) NOT NULL,
  `cargadores` int(10) NOT NULL,
  `otros` int(10) NOT NULL,
  PRIMARY KEY (`id_dis`),
  KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla telpos.distribuidor: ~3 rows (aproximadamente)
INSERT INTO `distribuidor` (`id_dis`, `nombre`, `direccion`, `telefono`, `codigo`, `nombreem`, `direcem`, `teleem`, `celulares`, `fundas`, `bocinas`, `audifonos`, `micas`, `cargadores`, `otros`) VALUES
	(19, 'Julia Anastacio Diaz', 'Centro #3', '7571091201', '41300', 'ITSM', 'S/N', '7571908716', 0, 1, 0, 1, 0, 1, 0),
	(20, 'Felicia Diaz Martinez', 'TEPEYEC', '7571222290', '41300', 'HMNG', 'Contlaclo', '7571091203', 1, 1, 1, 1, 1, 1, 1),
	(22, 'Javier Carlos', 'Call. Pipila, #30, Colonia Centro', '3456789011', '41300', 'Javier Carlos Garcia', 'Call. Pipila, #30, Colonia Centro', '3456789010', 1, 1, 0, 1, 1, 0, 0);

-- Volcando estructura para tabla telpos.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `distribuidor` varchar(250) NOT NULL,
  `articulos` varchar(250) NOT NULL,
  `garantia` varchar(250) NOT NULL,
  `codigo` varchar(250) NOT NULL,
  `modelo` varchar(250) NOT NULL,
  `marca` varchar(250) NOT NULL,
  `stock` int(10) NOT NULL DEFAULT 0,
  `descuento` int(10) NOT NULL DEFAULT 0,
  `preciocompra` decimal(10,2) NOT NULL DEFAULT 0.00,
  `precioventa` decimal(10,2) NOT NULL DEFAULT 0.00,
  `descripcion` varchar(250) NOT NULL,
  PRIMARY KEY (`id_product`),
  KEY `FK1 distribuidor` (`distribuidor`),
  CONSTRAINT `FK1 distribuidor` FOREIGN KEY (`distribuidor`) REFERENCES `distribuidor` (`nombre`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla telpos.productos: ~8 rows (aproximadamente)
INSERT INTO `productos` (`id_product`, `distribuidor`, `articulos`, `garantia`, `codigo`, `modelo`, `marca`, `stock`, `descuento`, `preciocompra`, `precioventa`, `descripcion`) VALUES
	(8, 'Julia Anastacio Diaz', 'cargadores', 'noaplica', '98765432', 'GAR064', '1HORA', 9, 0, 130.00, 159.00, ' Cargador Micro USB V8 2.0A con Cable USB a Micro USB 10w Compatible con Android Samsung Xiaomi Huawei Motorola'),
	(10, 'Julia Anastacio Diaz', 'audifonos', 'noaplica', '46798021', 'Tune 510BT', 'JBL', 8, 7, 550.00, 649.00, 'Auriculares inalámbricos con sonido Purebass - Negro'),
	(11, 'Julia Anastacio Diaz', 'fundas', 'noaplica', '12399023', 'Generic', 'EMMAR ', 15, 10, 99.00, 148.00, 'Funda Robot Uso rudo con Clip + Mica Gratis para Motorola (e20/ e40)'),
	(27, 'Javier Carlos', 'celulares', '3meses', '67890123', 'Galaxy S23', 'Samsung ', 9, 0, 25000.00, 25000.00, 'Ultra 5G Negro 512GB - visualización AMOLED de 6.8 Pulgadas 120 Hz, 200MP+12MP+10MP+10MP+10MP, cámara Selfie de 12MP, Video 8K, S-Pen Incluido'),
	(31, 'Felicia Diaz Martinez', 'celulares', 'noaplica', '7501125104275', 'Tap11 pro', 'Lenovo', 10, 0, 8000.00, 8000.00, '8Gb Ram, 128G almacenamiento'),
	(32, 'Felicia Diaz Martinez', 'micas', 'noaplica', '7500478030644', '14max', 'iPhone', 7, 0, 11000.00, 11000.00, 'Funda de iPhone 14max'),
	(33, 'Javier Carlos', 'audifonos', 'noaplica', '7501008726402', 'Aurum', 'STF', 34, 0, 399.50, 399.50, 'De Diadema Inalámbricos Aurum, Conexión 5.0, Micrófono Incorporado para Llamadas, Conexión De Cable 3.5 mm'),
	(37, 'Felicia Diaz Martinez', 'micas', 'noaplica', '234e6rtyh', 'sdfsdf', 'sdfsfsd', 31, 0, 134.00, 234.00, 'fdgdfagafafa');

-- Volcando estructura para tabla telpos.prueba
CREATE TABLE IF NOT EXISTS `prueba` (
  `id_prueba` int(11) NOT NULL AUTO_INCREMENT,
  `che` varchar(500) DEFAULT NULL,
  `xd` int(10) DEFAULT NULL,
  PRIMARY KEY (`id_prueba`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla telpos.prueba: ~9 rows (aproximadamente)
INSERT INTO `prueba` (`id_prueba`, `che`, `xd`) VALUES
	(1, '0', 1),
	(2, '1', 1),
	(3, '0', 0),
	(4, '0', 1),
	(5, '1', 0),
	(6, '0', 1),
	(7, '1', 0),
	(8, '1', 1),
	(9, '0', 1);

-- Volcando estructura para tabla telpos.reparaciones
CREATE TABLE IF NOT EXISTS `reparaciones` (
  `id_repa` int(5) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `contacto` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `motivo` varchar(50) NOT NULL,
  `marcaomodelo` varchar(50) NOT NULL,
  `coddesblo` int(10) NOT NULL,
  `accesorio` varchar(50) NOT NULL,
  `imei` double NOT NULL,
  `recibido` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `costoestimado` double NOT NULL,
  `falla` varchar(50) NOT NULL,
  `presupuesto` varchar(50) NOT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  PRIMARY KEY (`id_repa`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla telpos.reparaciones: ~4 rows (aproximadamente)
INSERT INTO `reparaciones` (`id_repa`, `nombre`, `contacto`, `correo`, `motivo`, `marcaomodelo`, `coddesblo`, `accesorio`, `imei`, `recibido`, `estado`, `costoestimado`, `falla`, `presupuesto`, `fecha`, `hora`) VALUES
	(3, 'Julia Anastacio Diaz', '7571091201', 'juliaanastacio', 'Reparación de software', 'samsung', 41300, 'sin funda', 89238392, 'root', 'Golpeado', 600, 'xd', 'Presupuestar', '2023-07-10', '02:26:00'),
	(8, 'Felicia Diaz Martinez', '3456789120', 'Felicia@gmail.com', 'Reparación de software', 'iPhone 14 Pro', 8989, 'kjkj', 9990098, 'root', 'Regular', 1400, 'Cambio de pantalla', 'Aceptado', '2023-07-23', '19:37:00'),
	(13, 'Javier Carlos Garcia', '2345678901', 'Javier@gmail.com', 'Reparación de Hardware', 'Huawei P30', 8345, 'Cargador', 5678901234, 'rodri', 'Regular', 600, 'Cambio de Centro de carga', 'Aceptado', '2023-07-23', '19:39:00'),
	(14, 'Julia Anastacio Diaz', '1234567890', 'Julia@gmail.com', 'Reparación de software', 'samsung, Galaxy S23 Ultra', 1234, 'ninguno', 987654321, 'rodri', 'Regular', 1200, 'no enciende el telefono', 'Presupuestar', '2023-07-23', '19:31:00');

-- Volcando estructura para tabla telpos.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(2) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `Nombrecompleto` varchar(50) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `user` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `fechaderegistro` date NOT NULL,
  `nivel_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla telpos.usuarios: ~2 rows (aproximadamente)
INSERT INTO `usuarios` (`id_usuario`, `Nombrecompleto`, `Telefono`, `user`, `password`, `fechaderegistro`, `nivel_usuario`) VALUES
	(01, 'root', '7571091201', 'root', 'root', '2023-07-09', 1),
	(05, 'rodri', '1234567890', 'Rodrigo Herrera', 'rodri', '2023-07-23', 2);

-- Volcando estructura para tabla telpos.venta
CREATE TABLE IF NOT EXISTS `venta` (
  `id_venta` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(10) unsigned NOT NULL,
  `usuario` text DEFAULT NULL,
  `total` float NOT NULL,
  `fecha` date NOT NULL,
  `hora` time DEFAULT NULL,
  PRIMARY KEY (`id_venta`),
  KEY `FK_id_usuario` (`id_usuario`),
  CONSTRAINT `FK_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla telpos.venta: ~85 rows (aproximadamente)
INSERT INTO `venta` (`id_venta`, `id_usuario`, `usuario`, `total`, `fecha`, `hora`) VALUES
	(1, 1, 'root', 1026.28, '2023-07-22', '16:03:09'),
	(2, 1, 'root', 899.99, '2023-07-22', '16:07:37'),
	(3, 1, 'root', 1063.79, '2023-07-22', '16:09:07'),
	(4, 1, 'root', 9918.09, '2023-07-22', '16:13:02'),
	(5, 1, 'root', 9918.09, '2023-07-22', '16:14:45'),
	(6, 1, 'root', 1063.79, '2023-07-22', '16:17:52'),
	(7, 1, 'root', 918.09, '2023-07-22', '16:19:58'),
	(8, 1, 'root', 981.89, '2023-07-22', '16:43:37'),
	(9, 1, 'root', 981.89, '2023-07-22', '16:46:50'),
	(10, 1, 'root', 159, '2023-08-12', '17:50:44'),
	(11, 1, 'root', 159, '2023-08-12', '17:51:00'),
	(12, 1, 'root', 148, '2023-08-12', '17:51:05'),
	(13, 1, 'root', 649, '2023-08-12', '17:57:55'),
	(14, 1, 'root', 649, '2023-08-12', '18:43:07'),
	(15, 1, 'root', 159, '2023-08-13', '18:41:28'),
	(16, 1, 'root', 808, '2023-09-02', '01:04:30'),
	(17, 1, 'root', 808, '2023-09-02', '01:05:33'),
	(18, 1, 'root', 296, '2023-09-02', '01:07:14'),
	(19, 1, 'root', 296, '2023-09-02', '01:09:57'),
	(20, 1, 'root', 148, '2023-09-02', '01:10:55'),
	(21, 1, 'root', 148, '2023-09-02', '01:13:55'),
	(22, 1, 'root', 148, '2023-09-02', '10:11:49'),
	(23, 1, 'root', 148, '2023-09-02', '10:14:19'),
	(24, 1, 'root', 0, '2023-09-02', '10:16:31'),
	(25, 1, 'root', 148, '2023-09-02', '10:19:38'),
	(26, 1, 'root', 148, '2023-09-02', '10:20:40'),
	(27, 1, 'root', 148, '2023-09-02', '10:22:04'),
	(28, 1, 'root', 148, '2023-09-02', '10:29:28'),
	(29, 1, 'root', 797, '2023-09-02', '10:55:12'),
	(30, 1, 'root', 148, '2023-09-02', '11:30:42'),
	(31, 1, 'root', 148, '2023-09-02', '11:32:38'),
	(32, 1, 'root', 148, '2023-09-02', '11:35:42'),
	(33, 1, 'root', 148, '2023-09-02', '11:55:41'),
	(34, 1, 'root', 148, '2023-09-02', '11:56:08'),
	(35, 1, 'root', 148, '2023-09-02', '11:56:20'),
	(36, 1, 'root', 148, '2023-09-02', '12:08:34'),
	(37, 1, 'root', 148, '2023-09-02', '12:11:53'),
	(38, 1, 'root', 148, '2023-09-02', '12:12:41'),
	(39, 1, 'root', 148, '2023-09-02', '12:14:51'),
	(40, 1, 'root', 148, '2023-09-02', '12:15:19'),
	(41, 1, 'root', 0, '2023-09-02', '12:24:34'),
	(42, 1, 'root', 148, '2023-09-02', '13:13:26'),
	(43, 1, 'root', 148, '2023-09-02', '13:13:59'),
	(44, 1, 'root', 148, '2023-09-02', '13:14:30'),
	(45, 1, 'root', 148, '2023-09-02', '13:15:30'),
	(46, 1, 'root', 148, '2023-09-02', '13:18:34'),
	(47, 1, 'root', 148, '2023-09-02', '13:19:09'),
	(48, 1, 'root', 148, '2023-09-02', '13:21:08'),
	(49, 1, 'root', 148, '2023-09-02', '13:21:45'),
	(50, 1, 'root', 148, '2023-09-02', '13:22:30'),
	(51, 1, 'root', 148, '2023-09-02', '13:23:21'),
	(52, 1, 'root', 148, '2023-09-02', '13:23:43'),
	(53, 1, 'root', 148, '2023-09-02', '15:39:01'),
	(54, 1, 'root', 148, '2023-09-02', '15:39:29'),
	(55, 1, 'root', 148, '2023-09-02', '15:40:03'),
	(56, 1, 'root', 148, '2023-09-02', '15:41:32'),
	(57, 1, 'root', 148, '2023-09-02', '15:42:05'),
	(58, 1, 'root', 148, '2023-09-02', '15:42:52'),
	(59, 1, 'root', 148, '2023-09-02', '15:43:53'),
	(60, 1, 'root', 148, '2023-09-02', '15:44:17'),
	(61, 1, 'root', 148, '2023-09-02', '15:44:45'),
	(62, 1, 'root', 148, '2023-09-02', '15:49:34'),
	(63, 1, 'root', 148, '2023-09-02', '17:56:25'),
	(64, 1, 'root', 148, '2023-09-02', '17:56:50'),
	(65, 1, 'root', 148, '2023-09-02', '17:57:08'),
	(66, 1, 'root', 148, '2023-09-02', '17:58:01'),
	(67, 1, 'root', 148, '2023-09-02', '17:59:18'),
	(68, 1, 'root', 148, '2023-09-02', '18:19:03'),
	(69, 1, 'root', 148, '2023-09-02', '18:21:42'),
	(70, 1, 'root', 1048, '2023-09-02', '18:24:36'),
	(71, 1, 'root', 1048.5, '2023-09-02', '18:25:53'),
	(72, 1, 'root', 547.5, '2023-09-02', '18:27:09'),
	(73, 1, 'root', 148, '2023-09-02', '18:28:03'),
	(74, 1, 'root', 1346.5, '2023-09-02', '18:28:45'),
	(75, 1, 'root', 1095, '2023-09-02', '18:30:39'),
	(76, 1, 'root', 296, '2023-09-02', '18:35:51'),
	(77, 1, 'root', 148, '2023-09-02', '18:40:14'),
	(78, 1, 'root', 148, '2023-09-02', '18:50:58'),
	(79, 1, 'root', 148, '2023-09-02', '18:53:10'),
	(80, 1, 'root', 148, '2023-09-02', '18:53:34'),
	(81, 1, 'root', 148, '2023-09-02', '18:53:57'),
	(82, 1, 'root', 148, '2023-09-02', '18:54:39'),
	(83, 1, 'root', 148, '2023-09-02', '18:56:13'),
	(84, 1, 'root', 148, '2023-09-02', '18:57:32'),
	(85, 1, 'root', 148, '2023-09-02', '18:58:49');

-- Volcando estructura para tabla telpos.venta_celular
CREATE TABLE IF NOT EXISTS `venta_celular` (
  `id_venta_celular` int(11) NOT NULL AUTO_INCREMENT,
  `id_venta` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_cliente_compra` int(11) NOT NULL,
  `preciocompra` float NOT NULL DEFAULT 0,
  `precioventa` float NOT NULL DEFAULT 0,
  `descuento` float DEFAULT NULL,
  `imei` varchar(50) NOT NULL DEFAULT '',
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id_venta_celular`),
  KEY `FK2_id_venta` (`id_venta`),
  KEY `FK_id_procutc` (`id_product`),
  KEY `FK_id_cliente_compra` (`id_cliente_compra`),
  CONSTRAINT `FK2_id_venta` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id_venta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_id_cliente_compra` FOREIGN KEY (`id_cliente_compra`) REFERENCES `cliente_compra` (`id_cliente_compra`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_id_procutc` FOREIGN KEY (`id_product`) REFERENCES `productos` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla telpos.venta_celular: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
