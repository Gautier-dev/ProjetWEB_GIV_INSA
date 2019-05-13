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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annonce`
--

LOCK TABLES `annonce` WRITE;
/*!40000 ALTER TABLE `annonce` DISABLE KEYS */;
INSERT INTO `annonce` VALUES (1,'admin',7,'Planète Terre. Fin de vie.','Le Monde',3,1),(37,'admin',3,'Corentin Clocheyyy','zcoco',2,1),(38,'jeiogio',4,'Super gourde pas utilisée mais je ne m\'en sers plus xD','Une gourde Quechua',1,1);
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
-- Table structure for table `cookies`
--

DROP TABLE IF EXISTS `cookies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cookies` (
  `idUser` varchar(64) NOT NULL,
  `value` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `cookies_value_uindex` (`value`),
  CONSTRAINT `cookies_utilisateurs` FOREIGN KEY (`idUser`) REFERENCES `utilisateurs` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Table permettant de retrouver la session et donc l''id de l''utilisateur';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cookies`
--

LOCK TABLES `cookies` WRITE;
/*!40000 ALTER TABLE `cookies` DISABLE KEYS */;
INSERT INTO `cookies` VALUES ('salut',6166612);
/*!40000 ALTER TABLE `cookies` ENABLE KEYS */;
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
INSERT INTO `quartiers` VALUES ('Antiquaille',5),('Bachut',8),('Bellecombe',6),('Bellecour',2),('Boulevard_Croix-Rousse',4),('Brotteaux',6),('Champvert',5),('Cimetière_Croix-Rousse',4),('Etats-Unis',8),('Fourviere',5),('Gerland',7),('Gorge_de_Loup',9),('Grand_Trou',8),('Grange_Blanche',8),('Guillotiere',3),('Hôpital_Croix-Rousse',4),('Menival',5),('Mermoz',8),('Monplaisir',8),('Montchat',3),('Mouche',7),('Moulin',8),('Part-Dieu',3),('Pentes_Croix-Rousse',1),('Perrache',2),('Place_Croix-Rousse',4),('Point_du_Jour',5),('Saint-Paul',5),('Saint-Rambert',9),('Sainte-Blandine',2),('Sarra',5),('Serein',4),('Vaise',9);
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
INSERT INTO `utilisateurs` VALUES ('admin','God','Shaggy','god42@up.com','0999','Guillotiere','721A9B52BFCEACC503C056E3B9B93CFA'),('ajaj',NULL,NULL,'ujuj',NULL,'Guillotiere','$2b$10$ZeWTe/kNUwVDw9NUviUk.eDOLxzCOL0JWgNoQXZ8m6zeBTdN33n32'),('bonjour',NULL,NULL,'salut',NULL,'Sarra','$2b$10$YaijMC2vN2NkSODUT2049Om1qBrsHDJZjlzSO6nSZn/e/QGK7Bm2u'),('jaja',NULL,NULL,'juju',NULL,'Part-Dieu','$2b$10$K.y8EF9oz2HpDYgFqMRu2eoG3x9Qt5gjQi/D2ssfk3GEe9D4LHPLm'),('jeiogio',NULL,NULL,'salut',NULL,'Part-Dieu','$2b$10$XUPsiiaPHy7.GsDBZt8Euev3Pzh4XQaCf.kMngs5WL07xUu3uYhuS'),('jufifeio',NULL,NULL,'',NULL,'Part-Dieu','$2b$10$/Vn3XHM6vizJUGo/Hu5.OOiVJmS.DAUsgq0srz9pwf47t5VBU9lrG'),('salut',NULL,NULL,'samuel.j@orange.fr',NULL,'Part-Dieu','$2b$10$o9E5Tgz/ZdoCNJdxKX5OzujZculkGpL8R79eGsN8p5Zc0oua5xEjC');
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

-- Dump completed on 2019-05-13 18:48:20
