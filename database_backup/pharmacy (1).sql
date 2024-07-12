-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2024 at 03:09 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pharmacy`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `phone`, `photo`, `role`) VALUES
(13, 'asmita', 'as@gmail.com', '7876567656', 'profile_1720095590477.png', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `photo`) VALUES
(1, 'injection', 'category_1720585814291.png'),
(2, 'tablet', 'category_1720605150038.png');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` int(100) NOT NULL,
  `subcategory` int(100) NOT NULL,
  `photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `category`, `subcategory`, `photo`) VALUES
(4, 'company 1', 1, 4, 'company_1720680529584.png'),
(5, 'company 2', 1, 5, 'company_1720680547617.png');

-- --------------------------------------------------------

--
-- Table structure for table `composition`
--

CREATE TABLE `composition` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` int(11) NOT NULL,
  `subcategory` int(11) NOT NULL,
  `company` int(11) NOT NULL,
  `photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `composition`
--

INSERT INTO `composition` (`id`, `name`, `category`, `subcategory`, `company`, `photo`) VALUES
(1, 'composition 1', 1, 5, 5, 'composition_1720680778660.png'),
(2, 'composition 2', 1, 4, 4, 'composition_1720680868917.png');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `hospital` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id`, `name`, `hospital`, `address`, `phone`, `email`, `role`, `photo`) VALUES
(1, 'dr.arti khan', 'kavde clinic', 'manish nagarrrrrrrr', '8976787678', 'arti@gmail.com', 'Doctor', ''),
(3, 'dr.sumit', 'kavde clinic', 'manish nagar', '8987678767', 'kavde@gmail.com', 'Doctor', '');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_description`
--

CREATE TABLE `doctor_description` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `date` date NOT NULL,
  `doctor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_description`
--

INSERT INTO `doctor_description` (`id`, `name`, `description`, `date`, `doctor`) VALUES
(1, 'laxmi hanwatkar', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five cen', '2024-07-12', 1);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(11) NOT NULL,
  `register` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `username`, `password`, `role`, `register`) VALUES
(9, 'as@gmail.com', '$2a$10$A6tqX9tcJf7qDwfPaSszWOai2xXDPpr6rMn07CsdcXiBUxmiNkMBO', 'Admin', 13),
(15, 'shravni@gmail.com', '$2a$10$Tb.hLUa360hxneUFpBi18OQVB7GWTLUH.W1NxcfxuD3W/jPySTZam', 'Pharmacy', 8),
(17, 'ekant@gmail.com', '$2a$10$nQ8h3FTiEfdkmp0979.2xOMrOxseQdmNqUEzGN/eSA49Jc8GBTLkW', 'Pharmacy', 10),
(20, 'arti@gmail.com', '$2a$10$nxSjZQPhtFA6EAv/8ZLlnuByfR3dZXYB783fb2A0ZoBwATzFHe1wO', 'Doctor', 1),
(22, 'kavde@gmail.com', '$2a$10$MTsZ6/Mb68CEAQSeZAdUoO0rShIMoetjJQxleHPOEXnh7EkoySpua', 'Doctor', 3);

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `category` int(11) NOT NULL,
  `subcategory` int(11) NOT NULL,
  `composition` int(11) NOT NULL,
  `company` int(11) NOT NULL,
  `unit` int(11) NOT NULL,
  `price` varchar(200) NOT NULL,
  `Manufacturing` date NOT NULL,
  `expiry` date NOT NULL,
  `photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`id`, `name`, `category`, `subcategory`, `composition`, `company`, `unit`, `price`, `Manufacturing`, `expiry`, `photo`) VALUES
(1, 'nice', 1, 4, 2, 4, 1, '20', '2024-07-10', '2024-08-10', 'medicine_1720695978320.jpg'),
(2, 'ARTESUNATE injectable', 1, 4, 2, 4, 1, '200', '2024-07-12', '2024-08-12', 'medicine_1720775913874.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `order_table`
--

CREATE TABLE `order_table` (
  `id` int(11) NOT NULL,
  `suborder` int(11) NOT NULL,
  `grand_total` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pharmacy`
--

CREATE TABLE `pharmacy` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `owner` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pharmacy`
--

INSERT INTO `pharmacy` (`id`, `name`, `owner`, `address`, `phone`, `email`, `role`, `photo`) VALUES
(8, 'shravni pharmacy', 'ashwin D meshram', 'manish nagar', '9098787656', 'shravni@gmail.com', 'Pharmacy', ''),
(10, 'shekhar pharmacy', 'ekant kodape', 'manish nagar', '8987676567', 'ekant@gmail.com', 'Pharmacy', '');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role`) VALUES
(5, 'Doctor'),
(6, 'Admin'),
(10, 'Pharmacy');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `medicine` int(11) NOT NULL,
  `stock` varchar(100) NOT NULL,
  `balance` varchar(100) NOT NULL,
  `qty` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `medicine`, `stock`, `balance`, `qty`) VALUES
(1, 1, '20', '20', ''),
(11, 2, '30', '30', '');

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` int(100) NOT NULL,
  `photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`id`, `name`, `category`, `photo`) VALUES
(4, 'ACETAMINOPHEN injectable', 1, 'subcategory_1720680410195.png'),
(5, 'ADRENALINE injectable', 1, 'subcategory_1720680494976.png');

-- --------------------------------------------------------

--
-- Table structure for table `suborder`
--

CREATE TABLE `suborder` (
  `id` int(11) NOT NULL,
  `medicine` int(11) NOT NULL,
  `expire` date NOT NULL,
  `qty` varchar(500) NOT NULL,
  `medicine_price` varchar(500) NOT NULL,
  `total` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` int(11) NOT NULL,
  `subcategory` int(11) NOT NULL,
  `company` int(11) NOT NULL,
  `composition` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `name`, `category`, `subcategory`, `company`, `composition`) VALUES
(1, 'strips', 1, 4, 4, 2),
(2, 'PCS', 1, 4, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `variant`
--

CREATE TABLE `variant` (
  `id` int(11) NOT NULL,
  `name` varchar(11) NOT NULL,
  `category` int(11) NOT NULL,
  `subcategory` int(11) NOT NULL,
  `company` int(11) NOT NULL,
  `photo` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `role` (`role`) USING BTREE;

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `composition`
--
ALTER TABLE `composition`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_description`
--
ALTER TABLE `doctor_description`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor` (`doctor`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role` (`role`),
  ADD KEY `register` (`register`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_table`
--
ALTER TABLE `order_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `suborder` (`suborder`);

--
-- Indexes for table `pharmacy`
--
ALTER TABLE `pharmacy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `medicine` (`medicine`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suborder`
--
ALTER TABLE `suborder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicine` (`medicine`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `variant`
--
ALTER TABLE `variant`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `composition`
--
ALTER TABLE `composition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `doctor_description`
--
ALTER TABLE `doctor_description`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_table`
--
ALTER TABLE `order_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pharmacy`
--
ALTER TABLE `pharmacy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `suborder`
--
ALTER TABLE `suborder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `variant`
--
ALTER TABLE `variant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `doctor_description`
--
ALTER TABLE `doctor_description`
  ADD CONSTRAINT `doctor_description_ibfk_1` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`id`);

--
-- Constraints for table `order_table`
--
ALTER TABLE `order_table`
  ADD CONSTRAINT `order_table_ibfk_1` FOREIGN KEY (`suborder`) REFERENCES `suborder` (`id`);

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`medicine`) REFERENCES `medicine` (`id`);

--
-- Constraints for table `suborder`
--
ALTER TABLE `suborder`
  ADD CONSTRAINT `suborder_ibfk_1` FOREIGN KEY (`medicine`) REFERENCES `medicine` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
