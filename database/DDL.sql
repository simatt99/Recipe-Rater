/* 
Project: Recipe Rater
Group: Group 158
Members: Matthew Simoes & Abigail Whittle
Code Citations: MySQL Workbench
*/

/* DROP TABLES */

DROP TABLE IF EXISTS `Recipes`;
DROP TABLE IF EXISTS `Ingredients`;
DROP TABLE IF EXISTS `Categories`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Reviews`;
DROP TABLE IF EXISTS `RecipeCategories`;
DROP TABLE IF EXISTS `RecipeIngredients`;

/* CREATE TABLES */

CREATE TABLE `Recipes` (
  `recipeID` INT(5) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `userID` INT(5) NOT NULL,
  `datePosted` DATE NOT NULL,
  `instructionList` TEXT NOT NULL,
  `cookTime` TIME NOT NULL,
  `servingSize` INT(2) NOT NULL,
  PRIMARY KEY (`recipeID`),
  UNIQUE (`name`),
  FOREIGN KEY (`userID`) REFERENCES `Users` (`UserID`)
);

CREATE TABLE `Ingredients` (
  `ingredientID` INT(5) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `allergen` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ingredientID`),
  UNIQUE (`name`)
);

CREATE TABLE `Categories` (
  `categoryID` INT(5) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`categoryID`),
  UNIQUE (`name`)
);

CREATE TABLE `Users` (
  `userID` INT(5) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `joinDate` DATE NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE (`email`)
);

CREATE TABLE `Reviews` (
  `reviewID` INT(5) NOT NULL AUTO_INCREMENT,
  `recipeID` INT(5) NOT NULL,
  `userID` INT(5) NOT NULL,
  `datePosted` DATE NOT NULL,
  `rating` INT(2) NOT NULL,
  `comment` TEXT DEFAULT NULL,
  PRIMARY KEY (`reviewID`),
  FOREIGN KEY (`recipeID`) REFERENCES `Recipes` (`recipeID`),
  FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`)
);

CREATE TABLE `RecipeCategories` (
  `recipeCategoryID` INT(10) NOT NULL AUTO_INCREMENT,
  `categoryID` INT(5) NOT NULL,
  `recipeID` INT(5) NOT NULL,
  PRIMARY KEY (`recipeCategoryID`),
  FOREIGN KEY (`categoryID`) REFERENCES `Categories` (`categoryID`),
  FOREIGN KEY (`recipeID`) REFERENCES `Recipes` (`recipeID`)
);

CREATE TABLE `RecipeIngredients` (
  `recipeIngredientID` INT(10) NOT NULL AUTO_INCREMENT,
  `ingredientID` INT(5) NOT NULL,
  `recipeID` INT(5) NOT NULL,
  PRIMARY KEY (`recipeIngredientID`),
  FOREIGN KEY (`ingredientID`) REFERENCES `Ingredients` (`ingredientID`),
  FOREIGN KEY (`recipeID`) REFERENCES `Recipes` (`recipeID`)
);

/* INSERT INTO */

INSERT INTO `Categories` 
VALUES 
(1,'Breakfast'),
(2,'Lunch'),
(3,'Snack');

INSERT INTO `Ingredients` 
VALUES 
(1,'Bread','Flour, Yeast, Sugar, Milk, Egg, Oil/Fat',1),
(2,'Butter',NULL,1),
(3,'Jam','Berries, Sugar',0),
(4,'Peanuts',NULL,1),
(5,'Cheddar Cheese',NULL,1);

INSERT INTO `Users` 
VALUES 
(1,'Bob','Smith','bsmith@exe.com','2024-01-10'),
(2,'Jill','Teach','jteach@you.net','2024-01-15'),
(3,'Richard','Silas','silasr@two.com','2024-01-21');

INSERT INTO `Recipes` 
VALUES
(1,'Toast','Very yummy toast',2,'2024-01-15','toast bread, put on butter and jam','00:05:00',1),
(2,'Peanut Butter','Creamy peanut butter',1,'2024-01-24','grind the peanuts','00:15:00',5),
(3,'Grilled Cheese','Goey cheese on bread',2,'2024-02-01','toast bread (w butter), put cheese in middle, and melt','00:07:00',1);

INSERT INTO `Reviews` 
VALUES 
(1,1,3,'2024-01-21',9,'Yummy! I love the jam'),
(2,1,1,'2024-02-01',6,'You should try it with cheese'),
(3,2,2,'2024-02-04',4,'Jam is better...');

INSERT INTO `RecipeCategories` 
VALUES 
(1,1,1),
(2,3,2),
(3,2,3);

INSERT INTO `RecipeIngredients` 
VALUES 
(1,1,1),
(2,2,1),
(3,3,1),
(4,4,2),
(5,1,3),
(6,2,3),
(7,5,3);