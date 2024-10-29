import { NextResponse } from 'next/server';
import { fetchAndStoreTransactions } from '../../../utils/transactions';
import { db, transactions, wallets, eq } from '@/lib/db';

export async function GET() {
  try {
    const walletsList = await db.select().from(wallets).limit(1).execute();
    if (walletsList.length === 0) {
      return NextResponse.json({ error: 'No treasury wallet found' }, { status: 404 });
    }
    const walletAddress = walletsList[0].address;

    await fetchAndStoreTransactions(walletAddress);

    const txs = await db.select().from(transactions).where(eq(transactions.testnet_flag, true)).execute();

    return NextResponse.json({ transactions: txs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
