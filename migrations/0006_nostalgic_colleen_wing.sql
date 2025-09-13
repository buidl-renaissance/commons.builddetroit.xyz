DROP INDEX "blog_posts_slug_unique";--> statement-breakpoint
DROP INDEX "builder_invitations_invitation_token_unique";--> statement-breakpoint
DROP INDEX "members_email_unique";--> statement-breakpoint
DROP INDEX "members_modification_key_unique";--> statement-breakpoint
DROP INDEX "open_october_registrations_email_unique";--> statement-breakpoint
DROP INDEX "projects_modification_key_unique";--> statement-breakpoint
DROP INDEX "subscriptions_email_unique";--> statement-breakpoint
ALTER TABLE `open_october_registrations` ALTER COLUMN "name" TO "name" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `builder_invitations_invitation_token_unique` ON `builder_invitations` (`invitation_token`);--> statement-breakpoint
CREATE UNIQUE INDEX `members_email_unique` ON `members` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `members_modification_key_unique` ON `members` (`modification_key`);--> statement-breakpoint
CREATE UNIQUE INDEX `open_october_registrations_email_unique` ON `open_october_registrations` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `projects_modification_key_unique` ON `projects` (`modification_key`);--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_email_unique` ON `subscriptions` (`email`);--> statement-breakpoint
ALTER TABLE `open_october_registrations` ADD `message` text NOT NULL;