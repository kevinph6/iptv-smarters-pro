import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const blogPosts = sqliteTable('blog_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  author: text('author').notNull(),
  category: text('category').notNull(),
  featuredImageUrl: text('featured_image_url'),
  published: integer('published', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});


// Auth tables for better-auth
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  role: text("role").notNull().default("writer"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle').notNull(),
  description: text('description').notNull(),
  price: text('price').notNull(),
  cents: text('cents').notNull().default('00'),
  duration: text('duration').notNull(),
  type: text('type').notNull(),
  gradient: text('gradient').notNull(),
  icon: text('icon').notNull(),
  popular: integer('popular', { mode: 'boolean' }).notNull().default(false),
  bonus: text('bonus'),
  checkoutUrl: text('checkout_url').notNull(),
  images: text('images').notNull(),
  features: text('features').notNull(),
  rating: text('rating').notNull().default('4.8'),
  reviewCount: integer('review_count').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const productReviews = sqliteTable('product_reviews', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  author: text('author').notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment').notNull(),
  verified: integer('verified', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
});

// Orders table - tracks every payment attempt
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderNumber: text('order_number').notNull().unique(),
  email: text('email').notNull(),
  customerName: text('customer_name'),
  customerPhone: text('customer_phone'),
  productId: integer('product_id'),
  productSlug: text('product_slug').notNull(),
  productTitle: text('product_title').notNull(),
  amount: text('amount').notNull(),
  currency: text('currency').notNull().default('EUR'),
  status: text('status').notNull().default('pending'), // pending | paid | provisioned | failed
  paymentProvider: text('payment_provider'),
  valueCoin: text('value_coin'), // USDC amount received from PayGate
  ipnToken: text('ipn_token'),
  addressIn: text('address_in'), // encrypted wallet address from PayGate
  polygonAddressIn: text('polygon_address_in'), // on-chain wallet for tracking
  // IPTV credentials (filled after MegaOTT provisioning)
  iptvUsername: text('iptv_username'),
  iptvPassword: text('iptv_password'),
  iptvServerUrl: text('iptv_server_url'),
  iptvExpDate: text('iptv_exp_date'),
  iptvPlaylistUrl: text('iptv_playlist_url'),
  iptvPlaylistType: text('iptv_playlist_type'), // m3u, mag, enigma
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Payment settings - admin-configurable key-value store
export const paymentSettings = sqliteTable('payment_settings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  updatedAt: text('updated_at').notNull(),
});