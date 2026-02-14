
CREATE TABLE IF NOT EXISTS `oracle_insights` (
  `id` varchar(36) NOT NULL,
  `target_id` varchar(36) NOT NULL,
  `type` varchar(50) NOT NULL,
  `score` int NOT NULL,
  `payload` json,
  `status` varchar(20) DEFAULT 'active',
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` varchar(36) NOT NULL,
  `admin_id` varchar(36) NOT NULL,
  `action` varchar(100) NOT NULL,
  `target_id` varchar(100),
  `target_type` varchar(20),
  `metadata` json,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `audit_logs_admin_idx` (`admin_id`),
  CONSTRAINT `audit_logs_admin_id_users_id_fk` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`)
);

CREATE TABLE IF NOT EXISTS `broadcasts` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(20) DEFAULT 'system',
  `priority` varchar(10) DEFAULT 'normal',
  `is_active` boolean DEFAULT true,
  `created_at` datetime NOT NULL,
  `expires_at` datetime,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `tier` varchar(20) DEFAULT 'free',
  `status` varchar(20) DEFAULT 'active',
  `current_period_end` datetime,
  `stripe_customer_id` varchar(255),
  `stripe_subscription_id` varchar(255),
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subscriptions_user_idx` (`user_id`),
  CONSTRAINT `subscriptions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE IF NOT EXISTS `invoices` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `amount` int NOT NULL,
  `currency` varchar(3) DEFAULT 'usd',
  `status` varchar(20) DEFAULT 'paid',
  `pdf_url` varchar(255),
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `invoices_user_idx` (`user_id`),
  CONSTRAINT `invoices_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);
