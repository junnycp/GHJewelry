-- MySQL Script generated by MySQL Workbench
-- Thu Dec 12 18:59:05 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema datawebbh
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema datawebbh
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `datawebbh` DEFAULT CHARACTER SET utf8 ;
USE `datawebbh` ;

-- -----------------------------------------------------
-- Table `datawebbh`.`administrators`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawebbh`.`administrators` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `datawebbh`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawebbh`.`categories` (
  `id_category` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id_category`),
  UNIQUE INDEX `id_category_UNIQUE` (`id_category` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `datawebbh`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawebbh`.`orders` (
  `id_order` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user` INT(11) NULL DEFAULT NULL,
  `id_shipper` INT(11) NULL DEFAULT NULL,
  `status` INT(11) NULL DEFAULT NULL,
  `total` VARCHAR(45) NULL DEFAULT NULL,
  `created_time` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id_order`),
  UNIQUE INDEX `id_order_UNIQUE` (`id_order` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `datawebbh`.`order_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawebbh`.`order_detail` (
  `id_order` INT(11) NULL DEFAULT NULL,
  `id_product` INT(11) NULL DEFAULT NULL,
  `quantity` INT(11) NULL DEFAULT NULL,
  `total` VARCHAR(45) NULL DEFAULT NULL,
  INDEX `id_order_idx` (`id_order` ASC) VISIBLE,
  CONSTRAINT `id_order`
    FOREIGN KEY (`id_order`)
    REFERENCES `datawebbh`.`orders` (`id_order`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `datawebbh`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawebbh`.`products` (
  `id_product` INT(11) NOT NULL AUTO_INCREMENT,
  `id_category` INT(11) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `size` VARCHAR(10) NULL DEFAULT NULL,
  `price` VARCHAR(10) NOT NULL,
  `note` VARCHAR(100) NULL DEFAULT NULL,
  `image` VARCHAR(45) NULL DEFAULT NULL,
  `status` INT(11) NULL DEFAULT NULL,
  `created_time` TIMESTAMP NULL DEFAULT NULL,
  `updated_time` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_product`),
  UNIQUE INDEX `id_product_UNIQUE` (`id_product` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `datawebbh`.`shippers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawebbh`.`shippers` (
  `id_shipper` INT(11) NOT NULL AUTO_INCREMENT,
  `id_card` VARCHAR(20) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id_shipper`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `datawebbh`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datawebbh`.`users` (
  `id_user` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `phone` VARCHAR(12) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;