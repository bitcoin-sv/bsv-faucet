import "server-only";

import { db } from "../db";
import { eq } from "drizzle-orm";
import {
    numeric,
    pgTable,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const donations = pgTable("donations", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    walletAddress: text("wallet_address").notNull(),
    txHash: text("tx_hash").notNull(),
    createdAt: timestamp("created_at").notNull(),
});

export type SelectDonation = typeof donations.$inferSelect;
export type InsertDonation = typeof donations.$inferInsert;

export const insertDonationSchema = createInsertSchema(donations);

export async function getDonations(userId: string): Promise<SelectDonation[]> {
    return await db.select().from(donations).where(eq(donations.userId, userId));
}

export async function createDonation(donation: InsertDonation): Promise<InsertDonation> {
    const [insertedDonation] = await db.insert(donations).values(donation).returning();
    return insertedDonation;
}
