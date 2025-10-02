ALTER TABLE `expenses` ADD `payout_status` text DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `expenses` ADD `payout_tx_hash` text;--> statement-breakpoint
ALTER TABLE `expenses` ADD `payout_amount_cents` integer;--> statement-breakpoint
ALTER TABLE `expenses` ADD `payout_date` text;