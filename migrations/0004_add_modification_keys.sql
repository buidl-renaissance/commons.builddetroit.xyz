-- Add modification_key fields to projects and members tables
ALTER TABLE `projects` ADD `modification_key` text NOT NULL DEFAULT '';
ALTER TABLE `members` ADD `modification_key` text NOT NULL DEFAULT '';

-- Create unique indexes for modification keys
CREATE UNIQUE INDEX `projects_modification_key_unique` ON `projects` (`modification_key`);
CREATE UNIQUE INDEX `members_modification_key_unique` ON `members` (`modification_key`);
