CREATE TABLE `qr_hits` (
  `id` text PRIMARY KEY NOT NULL,
  `campaign` text NOT NULL,
  `venue` text NOT NULL,
  `event` text NOT NULL,
  `created` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_qr_hits_campaign_created` ON `qr_hits` (`campaign`,`created`);
