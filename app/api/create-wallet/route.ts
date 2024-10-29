import { NextResponse } from 'next/server';
import { generateNewWallet } from '../../../utils/wallet';
import { db, wallets } from '@/lib/db';

export async function POST() {
  try {
    const existingWallet = await db.select().from(wallets).limit(1).execute();
    if (existingWallet.length > 0) {
      return NextResponse.json({ error: 'Treasury wallet already exists.', wallet: existingWallet[0] }, { status: 400 });
    }

    // generate new wallet\
    const wallet = await generateNewWallet();

    return NextResponse.json({ wallet }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
