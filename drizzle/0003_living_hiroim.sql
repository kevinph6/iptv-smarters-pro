CREATE TABLE `product_reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer NOT NULL,
	`author` text NOT NULL,
	`rating` integer NOT NULL,
	`comment` text NOT NULL,
	`verified` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text NOT NULL,
	`description` text NOT NULL,
	`price` text NOT NULL,
	`cents` text DEFAULT '00' NOT NULL,
	`duration` text NOT NULL,
	`type` text NOT NULL,
	`gradient` text NOT NULL,
	`icon` text NOT NULL,
	`popular` integer DEFAULT false NOT NULL,
	`bonus` text,
	`checkout_url` text NOT NULL,
	`images` text NOT NULL,
	`features` text NOT NULL,
	`rating` text DEFAULT '4.8' NOT NULL,
	`review_count` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);