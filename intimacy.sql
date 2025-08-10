-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: intimacy
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'owner','$2b$10$9vyIfJyxEoY7Ste96EXne./iLvzfUz6rljI1QQJt1jijjHrRV2hV2','2025-07-07 17:03:24'),(4,'おなつえもん','$2b$10$qHJXjj/ek3/WMJcyA8nPg.vzozfkY7MCmMbI.d5n74abB5MXExmay','2025-07-08 06:09:20'),(8,'木内直','$2b$10$4npmVsIMpewk5.stbhNJnubiCTAgN.KLS7JnYD27BFLJdA0UjUaTi','2025-07-08 06:55:46');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cources`
--

DROP TABLE IF EXISTS `cources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `duration` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2223 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cources`
--

LOCK TABLES `cources` WRITE;
/*!40000 ALTER TABLE `cources` DISABLE KEYS */;
INSERT INTO `cources` VALUES (1111,'intimacy',60,8000.00,'スタンダードなコース'),(2222,'deepintimacy',80,12000.00,'より親密でサービスフルなコース');
/*!40000 ALTER TABLE `cources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Taro Yamada','male','090-1234-5678','taro@example.com','1990-01-01','2025-02-04 03:33:25','Regular customer'),(2,'Hanako Suzuki','female','080-8765-4321','hanako@example.com','1985-06-15','2025-02-04 03:33:25','VIP customer'),(5,'Taro Yamada','male','090-1234-5678','new_taro@example.com','1990-01-01','2025-02-04 03:47:43','Test Note');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discounts`
--

DROP TABLE IF EXISTS `discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `discount_type` enum('percentage','fixed') NOT NULL,
  `discount_value` decimal(10,2) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discounts`
--

LOCK TABLES `discounts` WRITE;
/*!40000 ALTER TABLE `discounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `published_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (2,'7月限定キャンペーン実施中！','夏の疲れを癒すキャンペーン開催中！ヘッドスパとボディケアのセットが通常より20%OFF！','2025-07-01 00:00:00','2025-06-15 23:52:11',NULL),(3,'セラピスト出勤情報のお知らせ','本日一部セラピストの出勤スケジュールに変更がございます。詳しくは予約ページをご覧ください。','2025-06-10 00:00:00','2025-06-15 23:52:11',NULL),(5,'★ホームページ鋭意作成中★','今月中には稼働予定！男女セラピスト大募集中！！','2025-06-17 12:37:17','2025-06-17 03:37:17',NULL),(6,'画像がいっぱい欲しい','サイトに使う最適な画像がたくさんほしいよ～','2025-06-17 14:52:47','2025-06-17 05:52:47',NULL),(11,'新規テスト','たのむ～！\r\n','2025-06-18 11:09:06','2025-06-18 02:09:06',NULL),(12,'へいへい','たのむよ～','2025-06-18 12:35:28','2025-06-18 03:35:28','/uploads/1750218040228-635285885.jpeg'),(14,'新規！','ようやく！漸く！！','2025-06-18 13:27:03','2025-06-18 04:27:03','/uploads/1750220823808-444634317.png');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('cash','credit_card','digital') NOT NULL,
  `payment_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `reservation_date` datetime DEFAULT NULL,
  `cource_id` int DEFAULT NULL,
  `therapist_id` int DEFAULT NULL,
  `status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
  `menu` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `therapist` varchar(100) DEFAULT NULL,
  `customer_name` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `note` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `cource_id` (`cource_id`),
  KEY `therapist_id` (`therapist_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`cource_id`) REFERENCES `cources` (`id`),
  CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`therapist_id`) REFERENCES `therapists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (5,NULL,NULL,NULL,NULL,'pending','ヘッドスパ','2025-06-17','14:00:00','セラピスト花子','風呂キャンマン','02626262626','私綺麗？'),(7,NULL,NULL,NULL,NULL,'pending','アロマトリートメント','2025-06-20','15:00:00','セラピスト優子','ぬるぬるおばけ','02810281','nurunuru'),(8,NULL,NULL,NULL,NULL,'pending','ボディケア','2025-06-18','16:30:00','セラピスト花子','身体ばきお','89898989898','ところてんになりたい'),(9,NULL,NULL,NULL,NULL,'pending','ヘッドスパ','2025-06-20','15:00:00','セラピスト優子','コーンロー','09034348989','ほどいて～'),(10,NULL,NULL,NULL,NULL,'pending','ヘッドスパ','2025-07-10','11:00:00','セラピスト優子','たなばたたろう','77777777777','天の川～'),(11,NULL,NULL,NULL,NULL,'pending','アロマトリートメント','2025-07-11','12:30:00','セラピスト花子','name','11111111111','yoropiko');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('2I1VtljjpQrsGWbILEqyYHxnHJRiLJeu',1751965046,'{\"cookie\":{\"originalMaxAge\":7200000,\"expires\":\"2025-07-08T08:57:18.759Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"admin\":{\"id\":1,\"username\":\"owner\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `therapists`
--

DROP TABLE IF EXISTS `therapists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `therapists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `second_name` varchar(100) DEFAULT NULL,
  `first_ruby` varchar(100) DEFAULT NULL,
  `second_ruby` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `emergency_name` varchar(100) DEFAULT NULL,
  `emergency_phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `therapists`
--

LOCK TABLES `therapists` WRITE;
/*!40000 ALTER TABLE `therapists` DISABLE KEYS */;
/*!40000 ALTER TABLE `therapists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usage_history`
--

DROP TABLE IF EXISTS `usage_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usage_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `visit_date` datetime NOT NULL,
  `cource_id` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_amount` decimal(10,2) DEFAULT '0.00',
  `option_total` decimal(10,2) DEFAULT '0.00',
  `final_price` decimal(10,2) GENERATED ALWAYS AS (((`price` - `discount_amount`) + `option_total`)) STORED,
  `therapist_id` int DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `cource_id` (`cource_id`),
  KEY `therapist_id` (`therapist_id`),
  CONSTRAINT `usage_history_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `usage_history_ibfk_2` FOREIGN KEY (`cource_id`) REFERENCES `cources` (`id`),
  CONSTRAINT `usage_history_ibfk_3` FOREIGN KEY (`therapist_id`) REFERENCES `therapists` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usage_history`
--

LOCK TABLES `usage_history` WRITE;
/*!40000 ALTER TABLE `usage_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `usage_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usage_options`
--

DROP TABLE IF EXISTS `usage_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usage_options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usage_id` int NOT NULL,
  `option_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usage_id` (`usage_id`),
  KEY `option_id` (`option_id`),
  CONSTRAINT `usage_options_ibfk_1` FOREIGN KEY (`usage_id`) REFERENCES `usage_history` (`id`),
  CONSTRAINT `usage_options_ibfk_2` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usage_options`
--

LOCK TABLES `usage_options` WRITE;
/*!40000 ALTER TABLE `usage_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `usage_options` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-09 14:15:08
