CREATE TABLE `proof` (
	`id` text PRIMARY KEY NOT NULL,
	`used` integer DEFAULT false NOT NULL,
	`owner` text NOT NULL,
	FOREIGN KEY (`owner`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
