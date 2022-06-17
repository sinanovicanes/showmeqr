CREATE DATABASE IF NOT EXISTS `showmeqr`;

USE `showmeqr`;

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT(11) AUTO_INCREMENT,
    `username` VARCHAR(50) DEFAULT NULL,
    `password` VARCHAR(50) DEFAULT NULL,
    `mail` VARCHAR(50) DEFAULT NULL,
    `firstname` VARCHAR(50) DEFAULT NULL,
    `lastname` VARCHAR(50) DEFAULT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `user_connections` (
    `id` INT(11) AUTO_INCREMENT,
    `userId` INT(11),
    `type` VARCHAR(50),
    `connection` VARCHAR(50),
    PRIMARY KEY(`id`)
);