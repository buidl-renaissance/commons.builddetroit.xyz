CREATE TABLE `builder_invitations` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`bio` text,
	`skills` text,
	`website` text,
	`linkedin` text,
	`github` text,
	`twitter` text,
	`other_links` text,
	`invitation_token` text NOT NULL,
	`status` text DEFAULT 'pending',
	`invited_by` text,
	`expires_at` text,
	`accepted_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `builder_invitations_invitation_token_unique` ON `builder_invitations` (`invitation_token`);--> statement-breakpoint
DROP TABLE `walk_submissions`;--> statement-breakpoint
ALTER TABLE `members` ADD `profile_picture` text;--> statement-breakpoint
ALTER TABLE `members` ADD `website` text;--> statement-breakpoint
ALTER TABLE `members` ADD `linkedin` text;--> statement-breakpoint
ALTER TABLE `members` ADD `github` text;--> statement-breakpoint
ALTER TABLE `members` ADD `twitter` text;--> statement-breakpoint
ALTER TABLE `members` ADD `other_links` text;--> statement-breakpoint
ALTER TABLE `members` ADD `modification_key` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `members_modification_key_unique` ON `members` (`modification_key`);--> statement-breakpoint
ALTER TABLE `projects` ADD `modification_key` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `projects_modification_key_unique` ON `projects` (`modification_key`);