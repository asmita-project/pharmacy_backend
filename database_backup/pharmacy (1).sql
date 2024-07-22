-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2024 at 03:21 PM
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
(2, 'tablet', 'category_1720605150038.png'),
(4, 'Saline Solution', 'category_1721197532614.jpg'),
(5, 'First Aid', 'category_1721198389380.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` int(100) DEFAULT NULL,
  `subcategory` int(100) DEFAULT NULL,
  `photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `category`, `subcategory`, `photo`) VALUES
(4, 'company 1', 1, 4, 'company_1720680529584.png'),
(5, 'company 2', 1, 5, 'company_1720680547617.png'),
(6, 'Company', 1, 4, 'company_1721199403016.jpeg'),
(9, 'company4', 5, 6, 'company_1721200549215.jpeg'),
(11, 'Company3', 1, 5, 'company_1721200643967.jpeg'),
(12, 'company5', 2, 7, 'company_1721206440055.jpeg'),
(13, 'ZOXIL S Pvt Ltd', 2, 7, 'company_1721209976440.jpg'),
(14, 'abcs', 0, 0, 'company_1721365267031.webp');

-- --------------------------------------------------------

--
-- Table structure for table `composition`
--

CREATE TABLE `composition` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` varchar(11) DEFAULT NULL,
  `subcategory` varchar(11) DEFAULT NULL,
  `company` varchar(11) DEFAULT NULL,
  `photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `composition`
--

INSERT INTO `composition` (`id`, `name`, `category`, `subcategory`, `company`, `photo`) VALUES
(1, 'composition 1', '1', '5', '5', 'composition_1720680778660.png'),
(2, 'composition 2', '1', '4', '4', 'composition_1720680868917.png'),
(3, 'Composition', '1', '4', '4', 'composition_1721199790673.jpeg'),
(4, 'xyz', '', '', '', 'composition_1721639812968.png');

-- --------------------------------------------------------

--
-- Table structure for table `description`
--

CREATE TABLE `description` (
  `id` int(11) NOT NULL,
  `category` varchar(200) NOT NULL,
  `medicine` varchar(200) NOT NULL,
  `take` varchar(200) NOT NULL,
  `description` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `description`
--

INSERT INTO `description` (`id`, `category`, `medicine`, `take`, `description`) VALUES
(1, '1', 'nice', 'before lunch', 7),
(2, '1', 'ARTESUNATE injectable', 'fddfg', 8);

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
(4, 'Pravin Mendhe', 'P.M. Hospital', 'Kharbi Nagpur', '9579908433', 'vipin30@gmail.com', 'Doctor', ''),
(5, 'Dr.mukesh', 'city hospital', 'manish nagar', '8987678767', 'mukesh@gmail.com', 'Doctor', ''),
(6, 'Dr. Kanika Sharma', 'New Era Hospital', 'Queta Colony Nagpur', 'cdscdd5454545', 'kanika@gmail.com', 'Doctor', '');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_description`
--

CREATE TABLE `doctor_description` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `doctor` int(11) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `age` varchar(3) NOT NULL,
  `weight` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_description`
--

INSERT INTO `doctor_description` (`id`, `name`, `date`, `doctor`, `phone`, `age`, `weight`) VALUES
(7, 'Ms.payal gupta', '2024-07-19', 5, '20', '20', '12'),
(8, 'Sneha', '2024-07-22', 6, '1254545484', '26', '55');

-- --------------------------------------------------------

--
-- Table structure for table `expire_medicine`
--

CREATE TABLE `expire_medicine` (
  `id` int(11) NOT NULL,
  `medicine` int(11) NOT NULL,
  `stock` varchar(500) NOT NULL,
  `balance` varchar(500) NOT NULL,
  `expire` date NOT NULL,
  `batch` varchar(200) NOT NULL,
  `min_stock` varchar(500) NOT NULL,
  `phar` int(11) NOT NULL,
  `pharmacy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expire_medicine`
--

INSERT INTO `expire_medicine` (`id`, `medicine`, `stock`, `balance`, `expire`, `batch`, `min_stock`, `phar`, `pharmacy`) VALUES
(9, 1, '100', '100', '2024-07-19', 'A', '10', 0, 15),
(10, 3, '100', '100', '2024-06-30', 'B', '10', 0, 15),
(11, 2, '40', '40', '2024-07-20', 'B', '10', 0, 15),
(12, 2, '100', '100', '2024-07-20', 'A', '10', 0, 15),
(13, 3, '100', '100', '2024-07-21', 'A', '10', 0, 15);

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
(26, 'sagar@gmail.com', '$2a$10$szAK6DXkEFy41DMu2NPd1.0qDvIicWDCotVjLAgAmQDIEVk0vt7p2', 'Pharmacy', 15),
(27, 'admin@gmail.com', '$2a$10$szAK6DXkEFy41DMu2NPd1.0qDvIicWDCotVjLAgAmQDIEVk0vt7p2', 'Admin', 13),
(28, 'mukesh@gmail.com', '$2a$10$ZPVo9dyfqlbHKJCe9fQZwekF6mqAt1On7j/JnUgRV6f2XwdXuEIlO', 'Doctor', 5),
(30, 'apex@gmail.com', '$2a$10$YN.GG3LL6SU/jXY528ECO.4ML1j1YYC02rGquEN5MHNAHTGgtHh.6', 'Pharmacy', 17),
(31, 'fddf@gmail.com', '$2a$10$7OY.6wJuGJxkFfQ11VMHbeS4PGnRoTynuPtXWWgJy7YzKDkDX/alO', 'Pharmacy', 18),
(32, 'kanika@gmail.com', '$2a$10$VpS4uLUx86QOEdR1w.8lverj9MKGRKp6mIhSY79apXmiES7TfsJKi', 'Doctor', 6);

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `category` int(11) NOT NULL,
  `subcategory` int(11) NOT NULL,
  `composition` varchar(200) DEFAULT NULL,
  `company` varchar(200) DEFAULT NULL,
  `unit` varchar(200) DEFAULT NULL,
  `price` varchar(200) NOT NULL,
  `Manufacturing` date DEFAULT NULL,
  `expiry` date DEFAULT NULL,
  `photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`id`, `name`, `category`, `subcategory`, `composition`, `company`, `unit`, `price`, `Manufacturing`, `expiry`, `photo`) VALUES
(1, 'nice', 1, 4, '', '', '', '20', '2024-07-10', '2024-08-10', 'medicine_1720695978320.jpg'),
(2, 'ARTESUNATE injectable', 1, 4, '', '', '', '200', '2024-07-12', '2024-08-12', 'medicine_1720775913874.jpg'),
(3, 'Disprin', 1, 4, '', '', '', '7.50', '2024-07-11', '2025-07-11', 'medicine_1721206907341.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `order_table`
--

CREATE TABLE `order_table` (
  `id` int(11) NOT NULL,
  `grand_total` varchar(1000) NOT NULL,
  `customer` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_table`
--

INSERT INTO `order_table` (`id`, `grand_total`, `customer`) VALUES
(94, '55', 'sarangi bhujage');

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
(15, 'sagar pharmacy', 'nayan mishra', 'manish nagar', '7410560033', 'sagar@gmail.com', 'Pharmacy', ''),
(17, 'Apex Medicose1', 'Hemal ', 'Chhapru Square-09', '74102563521', 'apex@gmail.com', 'Pharmacy', ''),
(18, 'cffffffff', 'vffd', 'fdfdf', '15656656656251515515155', 'fddf@gmail.com', 'Pharmacy', '');

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
  `pharmacy` varchar(11) NOT NULL,
  `expire` date DEFAULT NULL,
  `batch` varchar(200) NOT NULL,
  `min_stock` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `medicine`, `stock`, `balance`, `pharmacy`, `expire`, `batch`, `min_stock`) VALUES
(23, 3, '100', '98', '15', '2024-09-25', 'B', '10'),
(24, 1, '100', '98', '15', '2024-09-21', 'B', '10'),
(25, 2, '100', '100', '15', '2024-10-21', 'B', '10'),
(26, 2, '100', '10', '17', '2025-07-01', 'B458IA', '10');

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
(5, 'ADRENALINE injectable', 1, 'subcategory_1720680494976.png'),
(6, 'Burn Heal ', 5, 'subcategory_1721638529204.jpeg'),
(7, 'Fever', 2, 'subcategory_1721206391702.jpeg');

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
  `total` varchar(500) NOT NULL,
  `category` varchar(200) DEFAULT NULL,
  `order_id` varchar(300) NOT NULL,
  `phamacy_id` varchar(200) NOT NULL,
  `subcategory` varchar(200) DEFAULT NULL,
  `medicine_name` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suborder`
--

INSERT INTO `suborder` (`id`, `medicine`, `expire`, `qty`, `medicine_price`, `total`, `category`, `order_id`, `phamacy_id`, `subcategory`, `medicine_name`) VALUES
(87, 3, '0000-00-00', '2', '7.50', '15', 'injection', '94', '15', 'ACETAMINOPHEN injectable', 'Disprin'),
(88, 1, '0000-00-00', '2', '20', '40', 'injection', '94', '15', 'ACETAMINOPHEN injectable', 'nice');

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` varchar(11) DEFAULT NULL,
  `subcategory` varchar(11) DEFAULT NULL,
  `company` int(11) DEFAULT NULL,
  `composition` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `name`, `category`, `subcategory`, `company`, `composition`) VALUES
(1, 'strips', '1', '4', 4, '2'),
(2, 'PCS', '1', '4', 4, '2'),
(4, 'ml1', '1', '5', 4, '2'),
(5, 'pcs1', '1', '5', 5, '1');

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
-- Indexes for table `description`
--
ALTER TABLE `description`
  ADD PRIMARY KEY (`id`),
  ADD KEY `description` (`description`);

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
-- Indexes for table `expire_medicine`
--
ALTER TABLE `expire_medicine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicine` (`medicine`),
  ADD KEY `pharmacy` (`pharmacy`);

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
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `medicine` (`medicine`),
  ADD KEY `category` (`category`),
  ADD KEY `suborder` (`order_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `composition`
--
ALTER TABLE `composition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `description`
--
ALTER TABLE `description`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `doctor_description`
--
ALTER TABLE `doctor_description`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `expire_medicine`
--
ALTER TABLE `expire_medicine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order_table`
--
ALTER TABLE `order_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `pharmacy`
--
ALTER TABLE `pharmacy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `suborder`
--
ALTER TABLE `suborder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `variant`
--
ALTER TABLE `variant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `description`
--
ALTER TABLE `description`
  ADD CONSTRAINT `description_ibfk_1` FOREIGN KEY (`description`) REFERENCES `doctor_description` (`id`);

--
-- Constraints for table `doctor_description`
--
ALTER TABLE `doctor_description`
  ADD CONSTRAINT `doctor_description_ibfk_1` FOREIGN KEY (`doctor`) REFERENCES `doctor` (`id`);

--
-- Constraints for table `expire_medicine`
--
ALTER TABLE `expire_medicine`
  ADD CONSTRAINT `expire_medicine_ibfk_1` FOREIGN KEY (`medicine`) REFERENCES `medicine` (`id`),
  ADD CONSTRAINT `expire_medicine_ibfk_2` FOREIGN KEY (`pharmacy`) REFERENCES `pharmacy` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
