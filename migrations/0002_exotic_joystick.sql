CREATE TABLE `open_october_registrations` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `open_october_registrations_email_unique` ON `open_october_registrations` (`email`);