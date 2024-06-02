-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: exmed_residencia
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `beneficio`
--

DROP TABLE IF EXISTS `beneficio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beneficio` (
  `valor_beneficio` float NOT NULL,
  `id_beneficio` int NOT NULL AUTO_INCREMENT,
  `nome_beneficio` varchar(250) NOT NULL,
  PRIMARY KEY (`id_beneficio`),
  KEY `idx_valor_beneficio` (`valor_beneficio`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beneficio`
--

LOCK TABLES `beneficio` WRITE;
/*!40000 ALTER TABLE `beneficio` DISABLE KEYS */;
INSERT INTO `beneficio` VALUES (30,2,'Desconto em Consulta Médica'),(35.5,3,'Desconto em Exames Laboratoriais'),(25,4,'Desconto em Medicamentos'),(22.8,6,'Desconto em Consulta Odontológica'),(38.2,7,'Desconto em Check-up Médico'),(15,9,'Avaliação Física');
/*!40000 ALTER TABLE `beneficio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beneficios_contratados`
--

DROP TABLE IF EXISTS `beneficios_contratados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beneficios_contratados` (
  `id_contratacao` int NOT NULL AUTO_INCREMENT,
  `id_usuario` varchar(55) NOT NULL,
  `id_beneficio` int NOT NULL,
  `data_contratacao` datetime DEFAULT CURRENT_TIMESTAMP,
  `valor_contratacao` float NOT NULL,
  PRIMARY KEY (`id_contratacao`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_beneficio` (`id_beneficio`),
  CONSTRAINT `beneficios_contratados_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `beneficios_contratados_ibfk_2` FOREIGN KEY (`id_beneficio`) REFERENCES `beneficio` (`id_beneficio`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beneficios_contratados`
--

LOCK TABLES `beneficios_contratados` WRITE;
/*!40000 ALTER TABLE `beneficios_contratados` DISABLE KEYS */;
INSERT INTO `beneficios_contratados` VALUES (1,'a76ff82b-7ded-46df-9c09-67dca8acc045',4,'2024-05-19 17:57:10',25),(2,'3c121c40-c2ee-4172-a5c4-c45a78dec5ef',4,'2024-05-23 20:41:04',25),(3,'0c4ba06b-52bb-4099-8e46-028a6f196cc5',9,'2024-05-26 18:09:07',15),(4,'8445782a-84f7-4537-b83d-5ba17006f291',9,'2024-06-01 17:32:01',15);
/*!40000 ALTER TABLE `beneficios_contratados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `id_compra` int NOT NULL,
  `cpf_usuario` varchar(14) DEFAULT NULL,
  `metodo_pagamento` varchar(200) NOT NULL,
  `data_compra` date NOT NULL,
  `valor_servico` float DEFAULT NULL,
  `desconto_beneficio` float NOT NULL,
  PRIMARY KEY (`id_compra`),
  KEY `idx_cpf_usuario` (`cpf_usuario`),
  KEY `valor_servico` (`valor_servico`),
  KEY `desconto_beneficio` (`desconto_beneficio`),
  CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`cpf_usuario`) REFERENCES `usuario` (`cpf`),
  CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`valor_servico`) REFERENCES `servicos` (`valor_do_servico`),
  CONSTRAINT `compras_ibfk_3` FOREIGN KEY (`desconto_beneficio`) REFERENCES `beneficio` (`valor_beneficio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cupons_gerados`
--

DROP TABLE IF EXISTS `cupons_gerados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cupons_gerados` (
  `id_cupon` int NOT NULL AUTO_INCREMENT,
  `id_contratacao` int NOT NULL,
  `codigo_cupon` varchar(50) NOT NULL,
  `validade` date NOT NULL,
  PRIMARY KEY (`id_cupon`),
  KEY `id_contratacao` (`id_contratacao`),
  CONSTRAINT `cupons_gerados_ibfk_1` FOREIGN KEY (`id_contratacao`) REFERENCES `beneficios_contratados` (`id_contratacao`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cupons_gerados`
--

LOCK TABLES `cupons_gerados` WRITE;
/*!40000 ALTER TABLE `cupons_gerados` DISABLE KEYS */;
INSERT INTO `cupons_gerados` VALUES (1,1,'e8d77d06-93a0-461f-a85e-c4434a110682','2024-11-19'),(2,2,'e768d89b-b52b-47d1-b2e7-0d3b0a76415c','2024-11-23'),(3,3,'07ad95fc-2fde-4d53-86a0-e55592208f0c','2024-11-26'),(4,4,'581a38d7-ce82-4e15-b9bd-43db1d783ac4','2024-12-01');
/*!40000 ALTER TABLE `cupons_gerados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dependentes`
--

DROP TABLE IF EXISTS `dependentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dependentes` (
  `id_dependente` int NOT NULL AUTO_INCREMENT,
  `cpf_usuario` varchar(14) NOT NULL,
  `nome_dependente` varchar(300) NOT NULL,
  `cpf_dependente` varchar(14) NOT NULL,
  `data_nascimento` date NOT NULL,
  `parentesco` int NOT NULL,
  `status_analise` int NOT NULL,
  PRIMARY KEY (`cpf_dependente`),
  UNIQUE KEY `id_dependente` (`id_dependente`),
  KEY `idx_cpf_usuario` (`cpf_usuario`),
  CONSTRAINT `dependentes_ibfk_1` FOREIGN KEY (`cpf_usuario`) REFERENCES `usuario` (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dependentes`
--

LOCK TABLES `dependentes` WRITE;
/*!40000 ALTER TABLE `dependentes` DISABLE KEYS */;
/*!40000 ALTER TABLE `dependentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indicacao`
--

DROP TABLE IF EXISTS `indicacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `indicacao` (
  `codigo_indicacao_por_cpf` varchar(55) NOT NULL,
  `cpf_usuario` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`codigo_indicacao_por_cpf`),
  KEY `idx_cpf_usuario` (`cpf_usuario`),
  CONSTRAINT `indicacao_ibfk_1` FOREIGN KEY (`cpf_usuario`) REFERENCES `usuario` (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indicacao`
--

LOCK TABLES `indicacao` WRITE;
/*!40000 ALTER TABLE `indicacao` DISABLE KEYS */;
INSERT INTO `indicacao` VALUES ('9f7c204f-4338-472c-9388-e84e754a76ec','118.314.099-17'),('5eedd95f-d38f-483e-938c-eb26bf4a6037','123.456.789-01'),('505e3f44-bac5-4ef3-9947-d691c7a06ffe','159.753.486-04'),('b26f2f44-67b9-44cb-b2a3-c089ea60310a','258.456.123-08'),('8f66cedf-cd8b-4235-8754-5a896219875e','344.374.366-87'),('38e196db-a39c-4784-b400-ddbe398948fa','357.159.258-05'),('ed3475ef-f966-43e1-b058-f84ad3cb130a','369.258.147-10'),('08c85f53-6905-4562-96df-b8531ccf48a4','370.703.281-76'),('3e200986-4b59-4cb3-b74d-3c7b6ff2f8ea','380.657.318-21'),('4b0da5b9-2dfa-43fd-9cc9-fbddd99ccc18','466.136.178-49'),('4d9289d6-12c9-40c3-9b57-7a71c2d0ab37','645.115.783-03'),('de8efb1a-800b-4147-b41a-d792d5320abc','654.321.789-09'),('504d1711-89ba-428b-8df9-c025961ea050','715.431.246-74'),('6c620abc-0197-4fd1-9fd4-59fbacbd6165','718.337.425-40'),('0cf4635f-5822-40e1-8450-472302b8b4ba','753.951.456-06'),('ee000c5c-59fa-491c-a14c-8662594f3fdd','765.432.109-25'),('9e0b1ae5-4e74-4766-87eb-da388d196831','767.570.794-02'),('1a61b0ff-b8b9-4b69-8a2a-ac14bb8ef023','852.741.963-03'),('f93cd4d9-8f40-4579-8150-46ab4d5ab1e3','921.384.650-24'),('e58e380b-5044-4986-ae25-4680e909ad80','946.674.752-50'),('3d8fc2c2-a325-45ff-8c09-dcd577d355df','987.654.321-00'),('2f669c7c-adcd-4d4c-bfe8-3d488d72c3de','987.654.321-02');
/*!40000 ALTER TABLE `indicacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicos`
--

DROP TABLE IF EXISTS `servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicos` (
  `id_servico` int NOT NULL AUTO_INCREMENT,
  `nome_plano` varchar(200) NOT NULL,
  `descricao` varchar(450) NOT NULL,
  `valor_do_servico` float DEFAULT NULL,
  PRIMARY KEY (`id_servico`),
  KEY `idx_valor_do_servico` (`valor_do_servico`),
  KEY `idx_nome_plano` (`nome_plano`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicos`
--

LOCK TABLES `servicos` WRITE;
/*!40000 ALTER TABLE `servicos` DISABLE KEYS */;
INSERT INTO `servicos` VALUES (1,'Exmed Pass','Garanta acesso aos melhores parceiros médicos a preços acessíveis e desfrute de teleconsultas ilimitadas.',19.9),(2,'Exmed Life','Descubra o seguro que protege você com até R$ 200 mil para diárias de internação e cirurgias nos melhores hospitais do Brasil.',79);
/*!40000 ALTER TABLE `servicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `cpf` varchar(14) NOT NULL,
  `id_usuario` varchar(55) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(250) NOT NULL,
  `data_nascimento` date NOT NULL,
  `codigo_indicacao_origem` varchar(55) DEFAULT NULL,
  `nome_completo` varchar(300) NOT NULL,
  `nome_plano` varchar(200) DEFAULT NULL,
  `logradouro` varchar(250) NOT NULL,
  `numero` int NOT NULL,
  `complemento` varchar(250) DEFAULT NULL,
  `saldo` float DEFAULT '0',
  `senha` varchar(255) DEFAULT NULL,
  `tipo` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `cpf_2` (`cpf`),
  UNIQUE KEY `id_usuario` (`id_usuario`),
  KEY `idx_nome_plano` (`nome_plano`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`nome_plano`) REFERENCES `servicos` (`nome_plano`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('344.374.366-87','04248f11-58e4-4a6e-b016-6c4723ca2ce0','(81) 99999-9999','amanda_couto@gmail.com','1960-09-23','f93cd4d9-8f40-4579-8150-46ab4d5ab1e3','Joana Lopes Lima','Exmed Pass','Estrada do Nassau',10,'Casa A',16,NULL,NULL),('380.657.318-21','0c4ba06b-52bb-4099-8e46-028a6f196cc5','(41) 99999-9999','renee@gmail.com','1970-09-23','f93cd4d9-8f40-4579-8150-46ab4d5ab1e3','Reneé Rapp','Exmed Life','Estrada do Encanamento',123,'Casa F',0,NULL,NULL),('159.753.486-04','10060769-d750-498a-b121-44bbc8b4e9b1','(41) 91234-5678','user4@example.com','1992-04-04','f93cd4d9-8f40-4579-8150-46ab4d5ab1e3','Diego Costa','Exmed Pass','Avenida Brasil',321,'Apto 303',15,NULL,NULL),('118.314.099-17','27df5745-3e6c-44a6-86b6-ff8a9ae5afd6','(81) 99999-9999','adm.exmed@gmail.com','2000-07-22',NULL,'Adm do Sistema',NULL,'Estrada do Forte',120,'Casa G',0,'$2a$10$.ZfGHMyPirtD7tRJoFJBsO99THE4V1evHecL0wRSXy.OGxU973fRC','adm'),('921.384.650-24','3c121c40-c2ee-4172-a5c4-c45a78dec5ef','(21) 98765-4321','ariana@gmail.com','1993-06-26','8034c8fa-630a-4516-8c55-ec57c0e94711','Ariana Grande','Exmed Life','Avenida das Américas',456,'Cobertura 101',6,NULL,NULL),('753.951.456-06','5f3c8f5c-f93b-4560-bfbe-6583dad40d5d','(61) 91234-5678','user6@example.com','1995-06-06','f93cd4d9-8f40-4579-8150-46ab4d5ab1e3','Fernanda Lima',NULL,'Rua das Magnólias',987,'Apto 404',7,NULL,NULL),('765.432.109-25','6c3736a9-a762-4fb4-bc0e-094a2580fb1f','(41) 99999-9999','renee@gmail.com','1970-09-23','f93cd4d9-8f40-4579-8150-46ab4d5ab1e3','Helena Oliveira','Exmed Life','Estrada do Encanamento',123,'Casa F',15,NULL,NULL),('123.456.789-01','7ef8092d-13e2-4000-b7a9-bf10c935f563','(81) 99999-9999','alice@gmail.com','1985-01-01','4b0da5b9-2dfa-43fd-9cc9-fbddd99ccc18','Alice May Oseman','Exmed Pass','Estrada da Amizade',23,'Casa H',15,NULL,NULL),('718.337.425-40','8445782a-84f7-4537-b83d-5ba17006f291','(81) 9452-2415','silva@gmail.com','1990-05-12','0cf4635f-5822-40e1-8450-472302b8b4ba','Silva Campos','Exmed Pass','Rua da Felicidade',5,'Apt 302',0,'$2a$10$2uRHdBkueG.cIZnbLBJNr.Re0VAsA7B69NLIFNbBfyPv/cUMATm/C','usuario'),('357.159.258-05','8c2939b9-8c0b-463c-917e-3c923db9cbde','(51) 91234-5678','user5@example.com','1989-05-05','f93cd4d9-8f40-4579-8150-46ab4d5ab1e3','Eliana Ribeiro',NULL,'Rua das Acácias',654,'Casa',5,NULL,NULL),('645.115.783-03','91ce4f27-ff01-4493-8721-3315e5816072','(81) 99999-9999','louise@gmail.com','1980-09-23','8f66cedf-cd8b-4235-8754-5a896219875e','Louise Couto','Exmed Pass','Estrada das Ambições',90,'Apt06',15,NULL,NULL),('258.456.123-08','993c0a60-efef-4db4-a083-a0f056e7062e','(81) 91234-5678','user8@example.com','1986-08-08','f93cd4d9-8f40-4579-8150-46ab4d5ab1e3','Helena Carvalho',NULL,'Rua das Orquídeas',951,'Apto 606',5,NULL,NULL),('654.321.789-09','9d69e78e-7f2d-455d-817c-2d43ce6d7c18','(91) 91234-5678','user9@example.com','1993-09-09','f93cd4d9-8f40-4579-8150-46ab4d5ab1e3','Igor Ferreira',NULL,'Rua das Violetas',357,'Casa',5,NULL,NULL),('466.136.178-49','a76ff82b-7ded-46df-9c09-67dca8acc045','(31) 98765-4321','test@example.com','1975-09-03','8a5d4a17-e5ca-456c-ae56-3f7c8f7a44c3','Jane Smith','Exmed Pass','Rua dos Sonhos',789,'Casa',2,NULL,NULL),('852.741.963-03','aef88359-c951-47bb-9922-8258551640fb','(31) 91234-5678','user3@example.com','1987-03-03','f93cd4d9-8f40-4579-8150-46ab4d5ab1e3','Carla Souza',NULL,'Rua das Palmeiras',789,'Casa',5,NULL,NULL),('715.431.246-74','b377fd68-6a41-467f-b357-5791ec0c661b','(81) 99999-9999','jose@gmail.com','1990-07-21','f93cd4d9-8f40-4579-8150-46ab4d5ab1e3','Jose Nascimento',NULL,'Estrada do Nassau',10,'Casa A',5,NULL,NULL),('987.654.321-00','b728e108-5afc-4ce9-a6b3-d55cf375272e','(31) 98765-4321','test@example.com','1975-09-03','8a5d4a17-e5ca-456c-ae56-3f7c8f7a44c3','Jane Smith','Exmed Pass','Rua dos Sonhos',789,'Casa',15,NULL,NULL),('767.570.794-02','b8c53d4f-e7a1-4537-8f5e-868a74a1fbb6','(41) 99999-9999','evange@gmail.com','1970-09-23',NULL,'Evange','Exmed Life','Estrada do Encanamento',123,'Casa F',10,NULL,NULL),('946.674.752-50','bc2b598f-3289-4f1c-a0cc-0fb04a0f20fa','(81) 99999-9999','celso.souza@gmail.com','1990-07-21',NULL,'Celso Souza','Exmed Pass','Estrada do Nassau',140,'Casa B',10,'$2a$10$7JF0ssbcskkudGo/3afofOqz.Mr.0OQ/TDhoVe92nk8GHggBLC1Yy','usuario'),('369.258.147-10','d69fad21-9bf9-4299-ae38-0630b6e910b5','(98) 91234-5678','user10@example.com','1994-10-10','f93cd4d9-8f40-4579-8150-46ab4d5ab1e3','Joana Martins','Exmed Pass','Rua das Rosas',753,'Apto 707',15,NULL,NULL),('987.654.321-02','e193aab3-5307-4300-924b-9c902ff730f5','(21) 91234-5678','user2@example.com','1990-02-02','4b0da5b9-2dfa-43fd-9cc9-fbddd99ccc18','Bruno Pereira','Exmed Life','Avenida Paulista',456,'Sala 202',15,NULL,NULL),('370.703.281-76','f9f2142b-f7d0-4771-ba2c-bea55e27f218','(41) 99999-9999','renee@gmail.com','1970-09-23','f93cd4d9-8f40-4579-8150-46ab4d5ab1e3','Helena Oliveira','Exmed Life','Estrada do Encanamento',123,'Casa F',15,NULL,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-01 21:10:34
