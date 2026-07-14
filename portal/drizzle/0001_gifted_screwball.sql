CREATE TABLE `contributions` (
	`id` text PRIMARY KEY NOT NULL,
	`team_id` text NOT NULL,
	`stage` text NOT NULL,
	`task_key` text NOT NULL,
	`task_title` text NOT NULL,
	`participant_name` text NOT NULL,
	`claimed_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contributions_claim_idx` ON `contributions` (`team_id`,`stage`,`task_key`,`participant_name`);