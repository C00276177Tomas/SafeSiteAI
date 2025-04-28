CREATE DATABASE  IF NOT EXISTS `sitesafe` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sitesafe`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: sitesafe
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','normal') DEFAULT 'normal',
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,1,'Tomas','Smitas','a@b.com','admin','pbkdf2:sha256:1000000$LQs6K0EM8My7$1d5e776f151fff827bca45cbf2988de0e141cf0aeffdc2e01048c1c398fe4f0f','2025-01-18 20:40:06','2025-04-10 09:34:16',1),(8,2,'test','testt','test@test.com','admin','pbkdf2:sha256:1000000$n5UYtNjYtuBH$55860747254b0fa998e71c22b17bfd66a71b842b4011fd0058d528cb7ac454ca','2025-01-25 14:55:28','2025-01-25 19:09:38',1),(14,2,'test22','\"<script>alert()</script>','test2@yo','normal','pbkdf2:sha256:1000000$KiQdulrkZMQN$8a846682c33b5fb1aa685c9c27890ca9da8d8f6893bdea810b2acc7004f81ffa','2025-01-25 15:30:45','2025-01-25 19:10:36',1),(28,1,'test','test','test.@email.com','admin','pbkdf2:sha256:1000000$1A8flM70Q1SH$39a92e36f4df45d3dfa988ee42d66d1137f5dfb417f2e0c99db0415612f652d5','2025-01-27 14:57:13','2025-01-27 14:57:13',1),(29,1,'Changed','User','normaluser@email.com','normal','pbkdf2:sha256:1000000$Qw5DKbNnJGel$39cfdf65208484b701e74d8fd345c160850f733c309ef2956eddad26a9343653','2025-01-27 15:16:19','2025-02-11 13:28:04',1),(30,8,'cc1','cc1','c@c.com','admin','Password','2025-01-28 15:01:09','2025-01-28 15:01:09',1),(31,9,'cc1','cc1','c2@c.com','admin','Password','2025-01-28 15:05:11','2025-01-28 15:05:11',1),(32,1,'Tom','Smitas','C00276177@gmail.com','admin','pbkdf2:sha256:1000000$z8vzoN3AFkRB$0280f53a73bc57a9bb3279c7983a1604e692acfb9fb81be24f16786f780a68e7','2025-02-13 17:51:03','2025-02-13 17:51:03',1),(33,10,'Tom','Smi','TomSmi@email.com','admin','Password','2025-02-13 21:43:50','2025-02-13 21:43:50',1),(34,11,'C','C','create@email.com','admin','pbkdf2:sha256:1000000$skOs1K76QTcO$23163a7535715769e0e2731b9cd24020f21fecd820fa4ad99dcc853f6b9d3ff8','2025-02-13 21:52:17','2025-02-13 21:52:17',1),(35,11,'JimEdited','MolEdited','jimmol2@email.com','normal','pbkdf2:sha256:1000000$fr0XmFk6mDOX$08425d323734535a917e6cc3a044debe60b38962e126b6801f20fae58a1f2307','2025-02-13 21:53:51','2025-02-13 21:54:15',1),(37,12,'test','test','test10@email.com','admin','pbkdf2:sha256:1000000$LkGHuvDC5xr1$2ad39da1871f5801637a8fd082d144784212fefdae9d66fc18de3bea10ccdb53','2025-02-14 12:13:28','2025-02-14 12:13:28',1),(39,13,'test','test','testtest10@email.com','admin','pbkdf2:sha256:1000000$f3dOz9IAERg6$cc0dd18ecbe8ec2db5fb3ce8ce826c6ce2b778ce425dd245c88d1ea593ef27cf','2025-02-14 12:19:11','2025-02-14 12:19:11',1),(41,14,'test4','test4','test4@email.com','admin','pbkdf2:sha256:1000000$ZuNtMBZFaHc0$50c8e05eadb1884552fa7d12e76341db38cf363c66a1b5131f5628b8f7e8c18f','2025-02-14 12:24:54','2025-02-14 12:24:54',1),(43,15,'test9','test9','test9@email.com','admin','pbkdf2:sha256:1000000$Qa6kgwvvySba$3f5d95b7e78b32fb8b12f6803b76fc75a3eb62dbbe04d6b1a21ab6aa1b34f8e3','2025-02-14 12:29:24','2025-02-14 12:29:24',1),(45,1,'Normal','User','normaluser@setu.ie','normal','pbkdf2:sha256:1000000$4MUZwFkED51b$a62a7b15083b31dd1c5f6b37b2c62177c0e2871b082786a3488a0e82c05a81c9','2025-04-21 11:55:32','2025-04-21 11:55:32',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-28 13:33:55
