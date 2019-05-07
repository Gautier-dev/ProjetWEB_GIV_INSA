-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: givinsa
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `annonce`
--

DROP TABLE IF EXISTS `annonce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `annonce` (
  `idAnnonce` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` varchar(64) NOT NULL,
  `idInteret` int(11) DEFAULT NULL,
  `description` text,
  `titre` text,
  `echelle` int(11) NOT NULL,
  `etat` int(11) NOT NULL,
  PRIMARY KEY (`idAnnonce`),
  KEY `annonce_utilisateurs` (`idUser`),
  CONSTRAINT `annonce_utilisateurs` FOREIGN KEY (`idUser`) REFERENCES `utilisateurs` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annonce`
--

LOCK TABLES `annonce` WRITE;
/*!40000 ALTER TABLE `annonce` DISABLE KEYS */;
INSERT INTO `annonce` VALUES (1,'admin',7,'Planète Terre. Fin de vie.','Le Monde',3,1),(37,'admin',3,'Corentin Clocheyyy','zcoco',2,1);
/*!40000 ALTER TABLE `annonce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `contacts` (
  `idUser1` varchar(64) NOT NULL,
  `idUser2` varchar(64) NOT NULL,
  `relation` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUser1`,`idUser2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interets`
--

DROP TABLE IF EXISTS `interets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `interets` (
  `idInteret` int(11) NOT NULL AUTO_INCREMENT,
  `nom` text NOT NULL,
  PRIMARY KEY (`idInteret`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interets`
--

LOCK TABLES `interets` WRITE;
/*!40000 ALTER TABLE `interets` DISABLE KEYS */;
INSERT INTO `interets` VALUES (1,'Textile'),(2,'Mobilier'),(3,'Electroménager'),(4,'Alimentaire'),(5,'Jouets'),(6,'Jeux vidéos'),(7,'Décoratif'),(8,'Récup'),(9,'Livres');
/*!40000 ALTER TABLE `interets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liensinterets`
--

DROP TABLE IF EXISTS `liensinterets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `liensinterets` (
  `idUser` varchar(64) NOT NULL,
  `idInteret` int(11) NOT NULL,
  `notification` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUser`,`idInteret`),
  KEY `liensinterets_interets` (`idInteret`),
  CONSTRAINT `liensinterets_interets` FOREIGN KEY (`idInteret`) REFERENCES `interets` (`idInteret`),
  CONSTRAINT `liensinterets_utilisateurs` FOREIGN KEY (`idUser`) REFERENCES `utilisateurs` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liensinterets`
--

LOCK TABLES `liensinterets` WRITE;
/*!40000 ALTER TABLE `liensinterets` DISABLE KEYS */;
INSERT INTO `liensinterets` VALUES ('admin',1,0),('admin',2,0),('admin',3,0),('admin',4,1),('admin',5,0),('admin',6,0),('admin',7,1),('admin',8,1),('admin',9,0);
/*!40000 ALTER TABLE `liensinterets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quartiers`
--

DROP TABLE IF EXISTS `quartiers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `quartiers` (
  `idQuartier` varchar(64) NOT NULL,
  `arrondissement` int(11) DEFAULT NULL,
  PRIMARY KEY (`idQuartier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quartiers`
--

LOCK TABLES `quartiers` WRITE;
/*!40000 ALTER TABLE `quartiers` DISABLE KEYS */;
INSERT INTO `quartiers` VALUES ('Bachut',8),('Bellecombe',6),('Bellecour',2),('Boulevard de la Croix-Rousse',4),('Brotteaux',6),('Champvert',5),('Cimetière de la Croix-Rousse',4),('Fourvière',5),('Gerland',7),('Gorge de Loup',9),('Grand Trou',8),('Grange Blanche',8),('Guillotière',3),('Hôpital de la Croix-Rousse',4),('L\'Antiquaille',5),('La Mouche',7),('La Sarra',5),('Les Etats-Unis',8),('Ménival',5),('Mermoz',8),('Monplaisir',8),('Montchat',3),('Part-Dieu',3),('Pentes de la Croix-Rousse',1),('Perrache',2),('Place de la Croix-Rousse',4),('Quartier du Moulin à Vent',8),('Quartier du Point du Jour',5),('Saint-Paul',5),('Saint-Rambert',9),('Sainte-Blandine',2),('Sérein',4),('Vaise',9);
/*!40000 ALTER TABLE `quartiers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `utilisateurs` (
  `idUser` varchar(64) NOT NULL,
  `nom` text,
  `prenom` text,
  `mail` text NOT NULL,
  `telephone` text,
  `idQuartier` varchar(64) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`idUser`),
  KEY `utilisateurs_quartiers` (`idQuartier`),
  CONSTRAINT `utilisateurs_quartiers` FOREIGN KEY (`idQuartier`) REFERENCES `quartiers` (`idQuartier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES ('admin','God','Shaggy','god42@up.com','0999','Guillotière','721A9B52BFCEACC503C056E3B9B93CFA');
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-07 15:28:47
