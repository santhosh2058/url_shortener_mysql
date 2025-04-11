CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` varchar(255) NOT NULL,
	`shortCode` varchar(20) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_shortCode_unique` UNIQUE(`shortCode`)
);
