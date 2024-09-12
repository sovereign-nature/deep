CREATE TABLE `dotphin_claim` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `dotphin_claim_user_id_unique` ON `dotphin_claim` (`user_id`);