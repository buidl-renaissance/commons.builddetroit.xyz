CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`merchant` text,
	`category` text,
	`amount_cents` integer,
	`currency` text DEFAULT 'USD',
	`expense_date` text,
	`notes` text,
	`receipt_url` text,
	`metadata` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
