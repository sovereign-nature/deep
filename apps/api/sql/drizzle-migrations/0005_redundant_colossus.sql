CREATE TABLE `mint` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`token_data` text NOT NULL
);
