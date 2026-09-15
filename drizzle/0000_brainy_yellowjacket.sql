CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`date` text NOT NULL,
	`venue` text NOT NULL,
	`budget` text NOT NULL,
	`details` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`starts` text NOT NULL,
	`ends` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_events_ends` ON `events` (`ends`);--> statement-breakpoint
CREATE TABLE `limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `subscribers` (
	`email` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`source` text NOT NULL,
	`created` text NOT NULL
);
