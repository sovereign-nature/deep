CREATE TABLE `profile` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`email` text,
	`email_verified` integer DEFAULT false NOT NULL,
	`telegram` text,
	`telegram_verified` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profile_email_unique` ON `profile` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `profile_telegram_unique` ON `profile` (`telegram`);