CREATE TABLE `decisions` (
	`id` text PRIMARY KEY NOT NULL,
	`team_id` text NOT NULL,
	`round` integer NOT NULL,
	`decision` text NOT NULL,
	`rationale` text NOT NULL,
	`sources` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`workshop_id` text NOT NULL,
	`team_id` text,
	`type` text NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `findings` (
	`id` text PRIMARY KEY NOT NULL,
	`team_id` text NOT NULL,
	`participant_name` text NOT NULL,
	`insight` text NOT NULL,
	`source` text NOT NULL,
	`implication` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `participants` (
	`id` text PRIMARY KEY NOT NULL,
	`team_id` text NOT NULL,
	`display_name` text NOT NULL,
	`role` text NOT NULL,
	`joined_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` text PRIMARY KEY NOT NULL,
	`workshop_id` text NOT NULL,
	`name` text NOT NULL,
	`ticker` text NOT NULL,
	`team_token` text NOT NULL,
	`status` text DEFAULT 'forming' NOT NULL,
	`value_score` integer DEFAULT 50 NOT NULL,
	`trust_score` integer DEFAULT 50 NOT NULL,
	`workforce_score` integer DEFAULT 50 NOT NULL,
	`execution_score` integer DEFAULT 50 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workshops` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`instructor_token` text NOT NULL,
	`stage` text DEFAULT 'lobby' NOT NULL,
	`paused` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	`expires_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `workshops_code_unique` ON `workshops` (`code`);