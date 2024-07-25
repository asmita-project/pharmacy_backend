-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2024 at 03:24 PM
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
(5, 'First Aid', 'category_1721198389380.jpeg'),
(6, 'Syrup', 'category_1721883912856.jpeg');

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
(14, 'abcs', 0, 0, 'company_1721365267031.webp'),
(16, 'Syna Pharma', 0, 0, 'company_1721885354274.png');

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
(4, 'xyz', '', '', '', 'composition_1721639812968.png'),
(5, 'abc1', '', '', '', 'composition_1721886993707.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `description`
--

CREATE TABLE `description` (
  `id` int(11) NOT NULL,
  `category` varchar(200) NOT NULL,
  `medicine` varchar(200) NOT NULL,
  `take` varchar(200) NOT NULL,
  `description` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `description`
--

INSERT INTO `description` (`id`, `category`, `medicine`, `take`, `description`, `date`) VALUES
(3, '2', 'Dolo 650mg Strip Of 15', 'before lunch', 9, '2024-07-25'),
(4, '2', 'Dolo 650mg Strip Of 15', 'before dinner', 9, '2024-07-24'),
(6, '2', 'Crocin 650', 'abc', 9, '2024-07-24'),
(8, '2', 'Dolo 650mg Strip Of 15', 'After Lunch', 10, '2024-07-25'),
(9, '6', 'Benadryl', 'After Lunch', 11, '2024-07-25');

-- --------------------------------------------------------

--
-- Table structure for table `description_details`
--

CREATE TABLE `description_details` (
  `id` int(11) NOT NULL,
  `description_id` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(6, 'Dr. Kanika Sharma', 'New Era Hospital', 'Queta Colony Nagpur', 'cdscdd5454545', 'kanika@gmail.com', 'Doctor', ''),
(7, 'Dr.patil', 'naik hospital', 'manish nagar', '89876765678', 'patil@gmail.com', 'Doctor', ''),
(9, 'Dr. Sandesh ', 'Khobragade Clinic', 'Vyankatesh Nagar , Kdk college road nagpur', '7410325896', 'sandesh@gmail.com', 'Doctor', '');

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
(9, 'pooja tiwari', '2024-07-25', 7, '7876566765', '20', '50'),
(10, 'Sandhya', '2024-07-25', 9, '8987676567', '26', '55'),
(11, 'Smita Paunikar', '2024-07-25', 9, '8987676567', '30', '60');

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
(27, 'admin@gmail.com', '$2a$10$szAK6DXkEFy41DMu2NPd1.0qDvIicWDCotVjLAgAmQDIEVk0vt7p2', 'Admin', 13),
(34, 'sagar@gmail.com', '$2a$10$l0W1oFP8I9XLetbGRfUgberU3iPJ9YJrMFlwaljvj1IwyPsJg.FsK', 'Pharmacy', 20),
(35, 'patil@gmail.com', '$2a$10$DfLzvvcC1OWu2TKpkCINZ.YPMa988VY.cD/N8Z6Tzw0lEZpfN5W0K', 'Doctor', 7),
(36, 'param@gmail.com', '$2a$10$dvW5WWpc2A7v2EIwL/Stcel07Pqqm8svAaIjo6hSCKtsgyCLVXAG2', 'Pharmacy', 21),
(38, 'sandesh@gmail.com', '$2a$10$wOWqnxsbztv2BI2SwOIMV.AggCzVko0KNmXa.Y5skhMKMUMwDGML.', 'Doctor', 9);

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
(5, 'Dolo 650mg Strip Of 15', 2, 8, '', '', 'Strip', '20', NULL, NULL, 'medicine_1721737051978.webp'),
(6, 'Crocin 650', 2, 8, '', '', 'Strip', '20', NULL, NULL, 'medicine_1721737361948.webp'),
(7, 'Benadryl', 6, 9, 'abc1', 'Syna Pharma', 'ml', '39.36', NULL, NULL, 'medicine_1721887958984.jpeg'),
(10, 'Himalaya Koflet Cough Syrup 100ml', 6, 9, 'Composition', 'ZOXIL S Pvt Ltd', 'ml', '0', NULL, NULL, 'medicine_1721902495122.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `order_table`
--

CREATE TABLE `order_table` (
  `id` int(11) NOT NULL,
  `grand_total` varchar(1000) NOT NULL,
  `customer` varchar(200) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_table`
--

INSERT INTO `order_table` (`id`, `grand_total`, `customer`, `date`) VALUES
(97, '60', 'sarangi bhujage', '2024-07-23 18:36:34'),
(98, '80', 'payal jivne', '2024-07-24 17:42:18'),
(99, '393.6', 'Raj ', '2024-07-25 11:53:46'),
(100, '1968', 'Prakash', '2024-07-25 12:46:58');

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
(20, 'sagar pharmacy', 'manoj khan', 'rameshwari nagpur', '8987676567', 'sagar@gmail.com', 'Pharmacy', ''),
(21, 'Param Medicose', 'Prakash Sonkusre', 'Telephone Exchange Square Nagpur', '7452369882', 'param@gmail.com', 'Pharmacy', '');

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
(27, 5, '100', '96', '20', '2024-09-21', 'A', '10'),
(28, 6, '20', '18', '20', '2024-09-23', 'A', '10'),
(29, 5, '5', '1', '20', '2024-09-24', 'B', '4'),
(30, 7, '100', '50', '20', '2024-07-28', 'B4487BN', '75');

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
(8, 'Dolo', 2, 'subcategory_1721730428198.webp'),
(9, 'Cough Syrup', 6, 'subcategory_1721884785202.jpeg');

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
  `medicine_name` varchar(200) DEFAULT NULL,
  `batch` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suborder`
--

INSERT INTO `suborder` (`id`, `medicine`, `expire`, `qty`, `medicine_price`, `total`, `category`, `order_id`, `phamacy_id`, `subcategory`, `medicine_name`, `batch`) VALUES
(91, 5, '0000-00-00', '1', '20', '20', 'tablet', '97', '20', 'Dolo', 'Dolo 650mg Strip Of 15', 'A'),
(92, 6, '0000-00-00', '2', '20', '40', 'tablet', '97', '20', 'Dolo', 'Crocin 650', 'A'),
(93, 5, '0000-00-00', '4', '20', '80', 'tablet', '98', '20', 'Dolo', 'Dolo 650mg Strip Of 15', 'B'),
(94, 7, '0000-00-00', '10', '39.36', '393.6', 'Syrup', '99', '20', 'Cough Syrup', 'Benadryl', 'B4487BN'),
(95, 7, '0000-00-00', '50', '39.36', '1968', 'Syrup', '100', '20', 'Cough Syrup', 'Benadryl', 'B4487BN');

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
(6, 'Strip', '', '', 0, ''),
(7, 'ml', '', '', 0, '');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `composition`
--
ALTER TABLE `composition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `description`
--
ALTER TABLE `description`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `doctor_description`
--
ALTER TABLE `doctor_description`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `expire_medicine`
--
ALTER TABLE `expire_medicine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_table`
--
ALTER TABLE `order_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `pharmacy`
--
ALTER TABLE `pharmacy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `suborder`
--
ALTER TABLE `suborder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
