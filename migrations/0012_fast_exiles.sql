CREATE TABLE `expense_images` (
	`id` integer PRIMARY KEY NOT NULL,
	`expense_id` integer NOT NULL,
	`image_url` text NOT NULL,
	`description` text,
	`image_type` text DEFAULT 'proof',
	`uploaded_by` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`expense_id`) REFERENCES `expenses`(`id`) ON UPDATE no action ON DELETE cascade
);
