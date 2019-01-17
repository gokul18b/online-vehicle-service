-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 27, 2018 at 11:39 PM
-- Server version: 5.1.41
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `vehicleservice`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE IF NOT EXISTS `bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `branchid` int(11) NOT NULL,
  `servideid` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `bill`
--

INSERT INTO `bill` (`id`, `branchid`, `servideid`, `amount`, `date`) VALUES
(23, 2, 18, 2200, '07-01-2018'),
(24, 1, 20, 350, '07-01-2018'),
(17, 2, 12, 250, '07-01-2018');

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE IF NOT EXISTS `branch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `landmark` varchar(100) NOT NULL,
  `pincode` int(11) NOT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `name`, `landmark`, `pincode`, `address`) VALUES
(1, 'RAJA HONDA SHOW ROOM', 'NEAR SIVAN THEATRE', 641987, 'Anna street,Avinashi Road , Tirupur'),
(2, 'RABA HONDA SHOW ROOM', 'NEAR OLD BUS STAND', 645667, 'Palladam Road, Tirupur');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE IF NOT EXISTS `service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mobile` varchar(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `branch` varchar(60) NOT NULL,
  `vehicle` varchar(30) NOT NULL,
  `serno` varchar(30) NOT NULL,
  `problem` text NOT NULL,
  `address` text NOT NULL,
  `status` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `date` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `mobile`, `name`, `branch`, `vehicle`, `serno`, `problem`, `address`, `status`, `uid`, `date`) VALUES
(24, '7418227833', 'Gokul', '2', 'CAR', 'TN 65 NH 0928', 'change tier', 'tup', 0, 9, '17-01-2018'),
(22, '9952316067', 'Madhan', '2', 'CAR', 'TN BK 0516', 'adkj', 'lkjs', 0, 10, '08-01-2018'),
(20, '9952316067', 'Madhan', '1', 'BIKE', 'TN 009 BH 0562', 'change oil', 'Annur', 1, 10, '07-01-2018'),
(18, '9952316067', 'Madhan', '2', 'CAR', 'AB 0000', 'Change tier', 'Annur', 1, 10, '07-01-2018'),
(12, '7418227833', 'Gokul', '2', 'BIKE', 'TN 39 BK 0516', 'normal service', '70 Anna street kumaranandhapuram', 1, 9, '07-01-2018');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `password` varchar(30) NOT NULL,
  `address` text NOT NULL,
  `FLAG` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `mobile`, `password`, `address`, `FLAG`) VALUES
(9, 'Gokul', '7418227833', 'gokul@94', '70 Anna street kumaranandhapuram Tirupur 641602', 0),
(8, 'Admin', '7418227833', 'gokul@18', '70 Anna street ,  Kumaranandhapuram , Tirupur 641602', 1),
(10, 'Madhan', '9952316067', 'madhan@95', '34 Raja street Annur post, coimbatore dist , 641234', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
