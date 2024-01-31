-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: event_registration
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `event_attendees`
--

DROP TABLE IF EXISTS `event_attendees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_attendees` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `eventId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`eventId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `event_attendees_ibfk_1` FOREIGN KEY (`eventId`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `event_attendees_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_attendees`
--

LOCK TABLES `event_attendees` WRITE;
/*!40000 ALTER TABLE `event_attendees` DISABLE KEYS */;
INSERT INTO `event_attendees` VALUES ('2024-01-30 10:44:48','2024-01-30 10:44:48',7,11),('2024-01-29 15:40:09','2024-01-29 15:40:09',32,17);
/*!40000 ALTER TABLE `event_attendees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `eventName` varchar(128) NOT NULL,
  `eventLocation` varchar(128) NOT NULL,
  `eventDate` datetime NOT NULL,
  `duration` time NOT NULL,
  `eventDescription` text NOT NULL,
  `eventPicture` varchar(256) DEFAULT NULL,
  `eventCategory` enum('Art & Culture','Technology','Concert','NightLife','Sports') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `organizerId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `organizerId` (`organizerId`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`organizerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Turneu i Basketbollit në Shkup','Shkup, Arena Boris Trajkovski','2024-03-21 15:30:00','02:00:00','Turneu i madh i basketbollit në arenën e njohur Boris Trajkovski në Shkup me ekipet më të mira nga rajoni.','https://live.staticflickr.com/3315/3231506121_9ce4faaa3d_b.jpg','Sports','2024-01-16 11:20:15','2024-01-29 15:32:16',7),(2,'Ekspozita e Pikturave Moderne','Shkodër, Galeria e Arteve','2024-08-29 15:00:00','02:00:00','Ekspozita e pikturave moderne në Galerinë e Arteve në Shkodër, ku artistët paraqesin kriacionet e tyre.','https://i0.wp.com/newspower.al/wp-content/uploads/2023/03/B4708038-F4A2-4F01-98A1-F8037A4424F4-scaled.jpeg?fit=2560%2C1440&ssl=1','Art & Culture','2024-01-16 11:20:15','2024-01-29 15:29:41',5),(7,'Festa e Muzikës Elektronike','Vlorë, Plazhi i Ri','2024-08-05 19:00:00','06:00:00','Festa e muzikës elektronike në plazhin e Vlorës me muzikë të mirë dhe atmosferë të këndshme.','https://cf.bstatic.com/xdata/images/hotel/max1024x768/292343667.jpg?k=11dc4670cc5c7a78bdc3632ddc61429cb785cad243c70cb405e7cb9d750f2b55&o=&hp=1','NightLife','2024-01-16 11:20:15','2024-01-29 15:26:04',1),(28,'Festival i Teknologjisë','Tirana, Sheshi Skënderbej','2024-02-15 19:00:00','03:00:00','Festivali i Teknologjisë me prezantime dhe demonstrime\nnga kompanitë liderë në industri.','https://lp-cms-production.imgix.net/2019-06/5999b6527508197d47c77b95ac8ae552-sheshi-skenderbej.jpg?auto=format&w=1920&h=640&fit=crop&crop=faces,edges&q=75','Technology','2024-01-27 11:59:16','2024-01-29 16:07:09',11),(29,'Koncerti Rock ne Pallatin e Kongreseve','Tirane, Pallati i Kongreseve','2024-06-12 06:00:00','05:00:00','Nje koncert spektakolar rock me artistet me\nte njohur ne Pallatin e Kongreseve.','https://upload.wikimedia.org/wikipedia/commons/5/59/Pallati_i_Kongreseve_Tirane_03.jpg','Concert','2024-01-29 10:48:30','2024-01-29 10:48:30',11),(30,'Turneu i Futbollit ne Stadiumin Kombetar','Tirane, Stadiumi Kombetar','2024-01-31 19:45:00','02:00:00','Nje turne futbolli emocionues me ekipet me te forta ne Stadiumin Kombetar.','https://www.researchgate.net/publication/353525813/figure/fig6/AS:1050602033405953@1627494452044/View-of-the-tribunes-of-Air-Albania-Stadium-Source-Author.png','Sports','2024-01-29 10:58:50','2024-01-29 10:59:13',17),(31,'Konferenca Teknologjike 2024','Durres, Amfiteatri i Durresit','2024-02-15 15:00:00','03:00:00','Konferenca e teknologjisë me prezantime dhe punëtori nga ekspertët e fushës në Amfiteatrin e Durresit.','https://live.staticflickr.com/2663/5826751382_ddac2169e9_b.jpg','Technology','2024-01-29 15:19:19','2024-01-29 15:19:19',17),(32,'Jazz Night at the Waterfront','Dhermi, Waterfront Stage','2024-07-16 19:00:00','04:00:00','An enchanting Jazz Night at the beautiful Waterfront Stage in Dhermi, featuring talented jazz musicians.','https://albania360.com/wp-content/uploads/2023/06/348856397_810181363806622_6192682650130084723_n.jpg','NightLife','2024-01-29 15:34:50','2024-01-29 15:34:50',8),(33,'Glow Party at the Beach','Vlora, Radhime Beach','2024-04-01 16:00:00','04:00:00','Experience a vibrant Glow Party under the stars at Radhime Beach in Vlora. Dance, glow, and enjoy the night!','https://www.visitalbania.app/wp-content/uploads/2022/06/vlore-sunny-la-plaia-0-600x400.jpg','Concert','2024-01-29 15:36:55','2024-01-29 15:36:55',8);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(128) NOT NULL,
  `lastName` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `phoneNumber` varchar(64) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Raymundo','Brown','Martin36@yahoo.com','$2a$12$XrseSZIGjoCLRQcS1Ikk6.GhCbVP4Qd/hJ7PqpZrZSkO2CZuDcftS',0,'1-859-768-5598 x8961','2024-01-16 11:20:15','2024-01-16 11:20:15'),(5,'Hortense','Boyer','Taya37@yahoo.com','$2a$12$XrseSZIGjoCLRQcS1Ikk6.GhCbVP4Qd/hJ7PqpZrZSkO2CZuDcftS',0,'1-750-564-6569 x642','2024-01-16 11:20:15','2024-01-16 11:20:15'),(7,'Jarrell','Bailey','Royal_Upton12@yahoo.com','$2a$12$XrseSZIGjoCLRQcS1Ikk6.GhCbVP4Qd/hJ7PqpZrZSkO2CZuDcftS',0,'1-850-467-4877 x83410','2024-01-16 11:20:15','2024-01-16 11:20:15'),(8,'Ben','Gleason','Granville_Sawayn@gmail.com','$2a$12$XrseSZIGjoCLRQcS1Ikk6.GhCbVP4Qd/hJ7PqpZrZSkO2CZuDcftS',0,'511.466.6551 x49002','2024-01-16 11:20:15','2024-01-16 11:20:15'),(11,'Romeo','Llangozi','romeollangozi123@gmail.com','$2a$12$XrseSZIGjoCLRQcS1Ikk6.GhCbVP4Qd/hJ7PqpZrZSkO2CZuDcftS',1,'0694660856','2024-01-16 12:50:07','2024-01-16 12:50:07'),(17,'ARMANDO','llangozi','armando@gmail.com','$2a$08$C/jUH8DKkY4KGMgpmSvtj.oTDbFZxM4FZFt0JS4vb8Gmw.hPCk.qS',0,'0694660856','2024-01-23 19:28:05','2024-01-23 19:28:05'),(18,'Ornela','Rrustaj','ornela.rrustaj1@gmail.com','$2a$08$SkDrc/cwPFkIbxHVCUTRXe7M61/h.VZ2eUTNqlN46nRsHPeCdMV5i',0,'0685182228','2024-01-29 16:12:03','2024-01-29 16:12:03'),(19,'Izabela','Nelaj','izabela@gmail.com','$2a$08$Kp4TvY7T6/6ORE0FZVMLhuPPHPSMP0DIxbnOCerqG1MAkD5./Ydhe',0,'0694512356','2024-01-30 10:46:20','2024-01-30 10:46:20');
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

-- Dump completed on 2024-01-31 17:13:07
