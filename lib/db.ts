// lib/db.ts
import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

// Define Enums
export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

// Example: Transaction types
export const transactionTypeEnum = pgEnum('transaction_type', ['incoming', 'outgoing']);

// Define the wallets table
export const wallets = pgTable('wallets', {
  id: serial('id').primaryKey(),
  address: text('address').unique().notNull(),
  privateKey: text('private_key').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Define the transactions table
export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  date: timestamp('date').defaultNow().notNull(),
  txid: text('txid').unique().notNull(),
  raw_tx: text('raw_tx').notNull(),
  beef_tx: jsonb('beef_tx').notNull(), // Changed from text to jsonb
  vout: integer('vout').notNull(),
  tx_type: transactionTypeEnum('tx_type').notNull(),
  spent_status: boolean('spent_status').default(false).notNull(),
  testnet_flag: boolean('testnet_flag').default(true).notNull(),
  amount_satoshis: numeric('amount_satoshis', { precision: 20, scale: 0 }).notNull(),
});

// Define the UTXOs table
export const utxos = pgTable('utxos', {
  id: serial('id').primaryKey(),
  txid: text('txid').notNull(),
  vout: integer('vout').notNull(),
  address: text('address').notNull(),
  amount_satoshis: numeric('amount_satoshis', { precision: 20, scale: 0 }).notNull(),
  script_pub_key: text('script_pub_key').notNull(),
  confirmations: integer('confirmations').notNull(),
  spent_status: boolean('spent_status').default(false).notNull(),
  // spent_by_txid: text('spent_by_txid').nullable(), // Made nullable
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Define the treasury_balance table
export const treasuryBalance = pgTable('treasury_balance', {
  id: serial('id').primaryKey(),
  total_balance_satoshis: numeric('total_balance_satoshis', { precision: 20, scale: 0 }).notNull(),
  last_updated: timestamp('last_updated').defaultNow().notNull(),
});

// Example: Insert schemas
export const insertWalletSchema = createInsertSchema(wallets);
export const insertTransactionSchema = createInsertSchema(transactions);
export const insertUtxoSchema = createInsertSchema(utxos);
export const insertTreasuryBalanceSchema = createInsertSchema(treasuryBalance);

// Example functions
export async function createWallet(address: string, privateKey: string) {
  return await db.insert(wallets).values({ address, privateKey }).returning();
}

export async function getWalletById(id: number) {
  return await db.select().from(wallets).where(eq(wallets.id, id)).execute();
}

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull(),
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      products: await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalProducts: 0,
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  let totalProducts = await db.select({ count: count() }).from(products);
  let moreProducts = await db.select().from(products).limit(5).offset(offset);
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProducts[0].count,
  };
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}

export { eq };
