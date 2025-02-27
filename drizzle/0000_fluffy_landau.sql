CREATE TABLE `posts_table` (
	`username` text NOT NULL,
	`message` text NOT NULL,
	`location` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`username` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_username_unique` ON `users_table` (`username`);